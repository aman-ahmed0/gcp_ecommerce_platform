param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectId,

  [string]$Region = "europe-west3",
  [int]$NodeCount = 1,
  [string]$NodeMachineType = "e2-medium",
  [string]$AlertEmail = "ahmad.fawzzi@gmail.com",
  [switch]$InstallArgoCD
)

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir
$InfraDir = Join-Path $RepoRoot "infrastructure"

$ArgoApp1 = Join-Path $RepoRoot "argocd\homeoffice-app.yaml"
$ArgoApp2 = Join-Path $RepoRoot "argocd\argocd-app.yaml"

Write-Host "Using project: $ProjectId"
Write-Host "Using region:  $Region"
Write-Host "Using nodes:   $NodeCount"
Write-Host "Infra dir:     $InfraDir"
Write-Host "Repo root:     $RepoRoot"

gcloud config set project $ProjectId
gcloud auth application-default set-quota-project $ProjectId

Write-Host "Enabling required APIs..."
gcloud services enable `
  serviceusage.googleapis.com `
  compute.googleapis.com `
  container.googleapis.com `
  logging.googleapis.com `
  monitoring.googleapis.com `
  --project $ProjectId

Set-Location $InfraDir

@"
project_id = "$ProjectId"
region     = "$Region"

cluster_name      = "homeoffice-cluster"
node_count        = $NodeCount
node_machine_type = "$NodeMachineType"
node_disk_size_gb = 30

alert_email = "$AlertEmail"
"@ | Set-Content terraform.tfvars

if (Test-Path ".\backend.tf") {
  Write-Host "Removing backend.tf so this one-hour lab uses local Terraform state."
  Remove-Item -Force ".\backend.tf"
}

terraform init -reconfigure
terraform fmt
terraform validate

Write-Host "Applying Terraform..."
terraform apply -auto-approve

Write-Host "Terraform succeeded. Fetching GKE credentials..."
gcloud container clusters get-credentials homeoffice-cluster --region $Region --project $ProjectId

kubectl config current-context
kubectl get nodes -o wide

if ($InstallArgoCD) {
  Write-Host "Installing ArgoCD..."
  kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
  kubectl apply -n argocd -f "https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml"
  kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s

  if (Test-Path $ArgoApp1) {
    kubectl apply -f $ArgoApp1
  } elseif (Test-Path $ArgoApp2) {
    kubectl apply -f $ArgoApp2
  } else {
    Write-Host "ArgoCD app file not found."
    Write-Host "Checked:"
    Write-Host $ArgoApp1
    Write-Host $ArgoApp2
  }
}

Write-Host ""
Write-Host "Next commands:"
Write-Host "kubectl get pods -A"
Write-Host "kubectl get ingress -n ecommerce -w"
Write-Host "kubectl port-forward svc/argocd-server -n argocd 8080:443"
Write-Host ""
Write-Host "ArgoCD admin password command:"
Write-Host '$p = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"; [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($p))'
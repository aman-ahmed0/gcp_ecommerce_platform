# ArgoCD – GitOps for HomeOffice Hub

## Installation

ArgoCD must be installed once per cluster. Run:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

After installation, apply the Application manifest:

```bash
kubectl apply -f application.yaml
```

## How it works

The `application.yaml` file tells ArgoCD to monitor the `kubernetes/` folder on the `develop` branch of this repository.

Any change pushed to that folder is automatically deployed to the cluster.

Manual changes in the cluster are automatically reverted to match the Git state.

## Accessing ArgoCD UI

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Login with the initial admin password (retrieved via):

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## Note

This configuration is cloud-ready. The same `application.yaml` works on local Docker Desktop, GKE, or any Kubernetes cluster. No changes needed.

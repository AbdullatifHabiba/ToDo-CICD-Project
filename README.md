# Todo List Application - DevOps Implementation with Dual Deployment Strategies

A comprehensive DevOps project showcasing modern deployment strategies and automation practices using a Node.js Todo application. This project demonstrates two distinct deployment approaches: **Docker Compose with Ansible** for streamlined VM deployment and **Kubernetes with GitOps** for production-grade container orchestration.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [DevOps Features](#devops-features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Deployment Strategies](#deployment-strategies)
  - [Strategy 1: Docker Compose + Ansible (VM Deployment)](#strategy-1-docker-compose--ansible-vm-deployment)
  - [Strategy 2: Kubernetes + GitOps (Container Orchestration)](#strategy-2-kubernetes--gitops-container-orchestration)
- [Infrastructure Setup](#infrastructure-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Configuration Management](#configuration-management)
- [Monitoring and Operations](#monitoring-and-operations)
- [GitOps Workflow](#gitops-workflow)
- [Security Implementation](#security-implementation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

This project demonstrates enterprise-grade DevOps practices through two complementary deployment strategies, showcasing different aspects of modern infrastructure management and automation.

**Base Application**: [Todo-List-nodejs](https://github.com/Ankit6098/Todo-List-nodejs) - A Node.js application with MongoDB backend.

### DevOps Implementation Highlights
- 🚀 **Dual Deployment Strategies** for different use cases
- 🤖 **Full Infrastructure Automation** with Ansible
- 🔄 **GitOps Continuous Deployment** with ArgoCD
- 🐳 **Containerization** with Docker and multi-arch builds
- ☸️ **Kubernetes Orchestration** with K3s
- 🔒 **Security-First Approach** with vulnerability scanning
- 📊 **Comprehensive Monitoring** and health checks
- 🛠️ **Infrastructure as Code** principles

## Architecture

### Strategy 1: Docker Compose + Watchtower (Auto-update)
 ![cicd-pipeline](./cicd1.gif)

### Strategy 2: Kubernetes + GitOps
![kubernetes-architecture](./cicd2.gif)

## DevOps Features

### Infrastructure Automation
- ✅ **Ansible Playbooks** for complete infrastructure setup
- ✅ **VM Provisioning** and configuration management
- ✅ **Service Discovery** and load balancing
- ✅ **Automated Health Checks** and validation

### Container Orchestration
- ✅ **Kubernetes (K3s)** lightweight cluster setup
- ✅ **Multi-Architecture Builds** (AMD64/ARM64)
- ✅ **StatefulSets** for database persistence
- ✅ **Ingress Controllers** for traffic management
### CI/CD Pipeline
- ✅ **GitHub Actions** workflow automation
- ✅ **Security Scanning** with Trivy
- ✅ **Semantic Versioning** and image tagging
- ✅ **Automated Testing** and quality gates

### GitOps Implementation
- ✅ **ArgoCD** for declarative deployments
- ✅ **Git-based Configuration** management

## Prerequisites

### System Requirements
- **Host Machine**: Linux/macOS with 16GB+ RAM
- **Virtualization**: KVM/QEMU or VMware
- **VM Resources**: 4GB RAM, 2 vCPUs, 20GB disk

### Required Tools
```bash
# Infrastructure Tools
- Ansible (4.0+)
- Docker (20.10+)
- Docker Compose (2.0+)
- Git
- SSH client

# Cloud Accounts
- GitHub account
- Docker Hub account
```

### Skills Prerequisites
- Basic Linux administration
- Docker containerization concepts
- Kubernetes fundamentals
- Git version control
- YAML configuration

## Project Structure

```
Todo-List-nodejs/
├── ansible/                      # Infrastructure automation
│   ├── inventory/                # VM inventory management
│   │   └── hosts.yml             # Target hosts configuration
│   ├── roles/                    # Ansible roles
│   │   ├── docker/               # Docker Compose deployment
│   │   │   └── tasks/main.yml    # Docker setup tasks
│   │   └── k8s/                  # Kubernetes ansible role
│   │       ├── tasks/            # K8s setup tasks
│   │       │   ├── main.yml      # Main K8s tasks
│   │       │   ├── install-k3s.yml       # K3s installation
│   │       │   ├── deploy-mongodb.yml    # MongoDB deployment
│   │       │   ├── deploy-app.yml        # Application deployment
│   │       │   ├── setup-argocd.yml      # ArgoCD installation
│   │       │   ├── create-scripts.yml    # Management scripts
│   │       │   └── setup-manifests.yml   # K8s manifests setup
│   ├── site.yml                  # Docker Compose playbook
│   └── site-k8s.yml             # Kubernetes playbook
├── .github/workflows/            # CI/CD automation
│   └── ci.yml                    # Multi-strategy pipeline
├── docker-compose.yml            # Container orchestration
├── Dockerfile                    # Container definition
└── README.md                     # This documentation
├── nginx.conf                    # Nginx configuration for reverse proxy
|── healthcheck.js               # Application health check script
```

## Deployment Strategies

## Strategy 1: Docker Compose + Ansible (VM Deployment)

**Use Case**: Traditional VM-based deployments, development environments, hybrid cloud scenarios.

### Key Benefits
- 🎯 **Simplified Operations** - Single VM management
- 🔧 **Easy Debugging** - Direct access to containers
- 💰 **Cost Effective** - Lower resource overhead
- 🚀 **Rapid Deployment** - Quick setup and teardown

### Infrastructure Setup

1. **Prepare VM Infrastructure**
   ```bash
   # Create Ubuntu VM (20.04 LTS recommended)
   # Ensure SSH access and sudo privileges
   # Update Ansible inventory with VM details
   ```

2. **Configure Ansible Inventory**
   ```yaml
   # ansible/inventory/hosts.yml
   webservers:
     hosts:
       todo-vm:
         ansible_host: 192.168.1.100  # Your VM IP
         ansible_user: ubuntu
         ansible_ssh_private_key_file: ~/.ssh/id_rsa
   ```

3. **Execute Docker Compose Deployment**
   ```bash
   cd ansible/
   
   # Deploy complete stack
   ansible-playbook site.yml -v --ask-become-pass
   
   # Verify deployment
   ansible webservers -m shell -a "docker ps"
   ```

### What Gets Deployed
- ✅ Docker and Docker Compose installation
- ✅ Application and MongoDB containers
- ✅ Health checks and monitoring setup
- ✅ Nginx reverse proxy configuration
- ✅ Watchtower for auto-updates

   #### Watchtower workflow
   - Watchtower monitors running containers
   - Pulls latest images from Docker Hub
   - Restarts containers with new images
   - Ensures minimal downtime 
   - Automatically updates containers without manual intervention
   - Maintains application availability during updates
  

### Post-Deployment Verification
```bash
# Check service status
curl http://vm-ip/health

# View container logs
ssh ubuntu@vm-ip
docker-compose logs -f
```

## Strategy 2: Kubernetes + GitOps (Container Orchestration)


### Key Benefits
- 🔄 **GitOps Automation** - Declarative deployments
- 🛡️ **High Availability** - Multi-replica deployments
- 📈 **Scalability** - Horizontal scaling capabilities
  
### Infrastructure Setup

1. **Deploy Kubernetes Cluster**
   ```bash
   cd ansible/
   
   # Update inventory for K8s deployment
   vim inventory/hosts.yml
   
   # Deploy complete K8s stack with ArgoCD
   ansible-playbook site-k8s.yml -v --ask-become-pass
   ```

2. **Configure GitHub Secrets**
   
   Repository Settings → Secrets and Variables → Actions:
   
   ```bash
   DOCKER_USERNAME=your-dockerhub-username
   DOCKER_PASSWORD=your-dockerhub-token
   PAT_TOKEN=your-github-pat
   ```

3. **Trigger GitOps Pipeline**
   <!-- use different repo for manifests -->
  # Manifest repository
  ![argocd-flow](./argocd.gif)
  

   Example manifest
  repository: [AbdullatifHabiba/todo-k8s-manifests](https://github.com/AbdullatifHabiba/todo-k8s-manifests)
   ```bash
   # Any push to main branch triggers full pipeline
   git add .
   git commit -m "feat: deploy to production"
   git push origin main
   ```

### What Gets Deployed
- ✅ K3s Kubernetes cluster
- ✅ MongoDB StatefulSet with persistent storage
- ✅ Todo application Deployment with replicas
- ✅ ArgoCD GitOps controller
- ✅ Ingress controller and networking
- ✅ Health checks 
### GitOps Workflow Automation
```bash
# Monitor deployment progress
ssh ubuntu@vm-ip
./k8s-status.sh

# Access ArgoCD dashboard
./argocd-access.sh

# Access application
./todo-app-access.sh
```

## Infrastructure Setup

### VM Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Memory** | 2GB | 4GB+ |
| **CPU** | 1 vCPU | 2+ vCPUs |
| **Storage** | 10GB | 20GB+ |
| **OS** | Ubuntu 20.04+ | Ubuntu 22.04 LTS |

### Network Configuration
```bash
# Ensure required ports are accessible
- 22    (SSH)
- 4000  (Application)
- 8080  (ArgoCD - K8s only)
```

### VM Provisioning Script
```bash
#!/bin/bash
# Basic VM setup script
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git vim
sudo usermod -aG sudo $USER

# Configure SSH key access
mkdir -p ~/.ssh
# Add your public key to ~/.ssh/authorized_keys
```

## CI/CD Pipeline

### GitHub Actions Workflow

The pipeline supports both deployment strategies:


### Pipeline Features
- 🔍 **Automated Security Scanning** with Trivy
- 🏗️ **Multi-Architecture Builds** for AMD64/ARM64
- 🏷️ **Semantic Image Tagging** with Git SHA
- 🔄 **Conditional Deployment** based on commit messages
- 📊 **Deployment Status Reporting**

### Image Tagging Strategy
```bash
# Generated tags for each build:
abdullatifhabiba/todo-nodejs:latest           # Latest main branch
abdullatifhabiba/todo-nodejs:main-a1b2c3d     # Git commit SHA
abdullatifhabiba/todo-nodejs:v1.0.0           # Release tags
```

## Configuration Management

### Environment Configuration

#### Docker Compose Strategy
```yaml
# docker-compose.yml environment variables
environment:
  - NODE_ENV=production
  - mongoDbUrl=mongodb://admin:secretpassword@mongodb:27017/todolist?authSource=admin
```

#### Kubernetes Strategy
```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
  namespace: todo-app
type: Opaque
data:
  mongodb-uri: bW9uZ29kYjovL2FkbWluOnNlY3JldHBhc3N3b3JkQG1vbmdvZGI6MjcwMTcvdG9kb2xpc3Q=
```

### Ansible Variables
```yaml
# ansible/group_vars/all.yml
app_name: todo-nodejs
docker_image: abdullatifhabiba/todo-nodejs
mongodb_root_password: secretpassword
```

## Monitoring and Operations

### Health Monitoring

#### Application Health Checks
```bash
# Built-in health endpoint
curl http://vm-ip/health

# Container health status
docker-compose ps  # Docker Compose
kubectl get pods -n todo-app  # Kubernetes
```



### Log Management

#### Docker Compose Logs
```bash
# Application logs
docker-compose logs -f todo-app

# Database logs  
docker-compose logs -f mongodb

# All services
docker-compose logs -f
```

#### Kubernetes Logs
```bash
# Application logs
kubectl logs -f deployment/todo-app -n todo-app

# Database logs
kubectl logs -f statefulset/mongodb -n todo-app

# ArgoCD logs
kubectl logs -f deployment/argocd-application-controller -n argocd
```

### Operational Scripts

After deployment, these management scripts are available:

```bash
# Kubernetes deployment
./k8s-status.sh           # Cluster overview
./argocd-access.sh        # ArgoCD dashboard access
./todo-app-access.sh      # Application access

```


## Security Implementation

### Container Security
- 🔒 **Multi-stage Docker builds** minimize attack surface
- 🔍 **Trivy vulnerability scanning** in CI pipeline
- 👤 **Non-root container execution**
- 

### Kubernetes Security
- 🔐 **Secrets management** for sensitive data



## Troubleshooting

### Common Issues and Solutions

#### Docker Compose Strategy

**Issue**: Containers fail to start
```bash
# Diagnosis
docker-compose ps
docker-compose logs

# Common fixes
docker-compose down -v
docker-compose up -d --build

# Check port conflicts
netstat -tulpn | grep :4000
```

**Issue**: Database connection failures
```bash
# Check MongoDB status
docker-compose exec mongodb mongosh --eval "db.adminCommand('ismaster')"

# Verify network connectivity
docker-compose exec todo-app nc -zv mongodb 27017

# Check environment variables
docker-compose exec todo-app env | grep mongo
```

#### Kubernetes Strategy

**Issue**: Pods stuck in Pending state
```bash
# Check node resources
kubectl describe nodes

# Check resource quotas
kubectl describe resourcequota -n todo-app

# Check pod events
kubectl describe pod <pod-name> -n todo-app
```

**Issue**: ArgoCD sync failures
```bash
# Check application status
kubectl get application todo-app -n argocd -o yaml

# Manual sync
kubectl patch application todo-app -n argocd \
  --type merge -p '{"spec":{"syncPolicy":{"syncOptions":["Prune=true"]}}}'

# Check repository access
kubectl logs deployment/argocd-repo-server -n argocd
```

**Issue**: Image pull errors
```bash
# Check image tag exists
docker pull abdullatifhabiba/todo-nodejs:main-abc123

# Verify secrets
kubectl get secret -n todo-app
kubectl describe secret app-secret -n todo-app
```

### Diagnostic Commands

#### System Diagnostics
```bash
# Resource usage
free -h
df -h
docker system df

# Network connectivity
ping -c 3 8.8.8.8
curl -I https://hub.docker.com

# Service status
systemctl status docker
systemctl status k3s  # Kubernetes only
```

#### Application Diagnostics
```bash
# Health checks
curl -f http://localhost/health

# Database connectivity
mongosh mongodb://admin:password@localhost:27017/admin

# Container inspection
docker inspect <container_id>
kubectl describe pod <pod_name> -n todo-app
```

### Recovery Procedures

#### Docker Compose Recovery
```bash
# Complete stack restart
docker-compose down
docker-compose up -d

# Data recovery
docker-compose down
docker volume ls
docker-compose up -d
```

#### Kubernetes Recovery
```bash
# Rollback deployment
kubectl rollout undo deployment/todo-app -n todo-app

# Restart pods
kubectl rollout restart deployment/todo-app -n todo-app

# Emergency pod deletion
kubectl delete pod <pod-name> -n todo-app --force
```

## Contributing

### Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/Todo-List-nodejs.git
   cd Todo-List-nodejs
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/devops-enhancement
   ```

3. **Test Changes**
   ```bash
   # Test Docker Compose approach
   docker-compose up -d
   
   # Test Kubernetes approach (requires VM)
   cd ansible/
   ansible-playbook site-k8s.yml --check
   ```

4. **Submit Changes**
   ```bash
   git add .
   git commit -m "feat: enhance monitoring capabilities"
   git push origin feature/devops-enhancement
   ```

### DevOps Contribution Areas
- 🔧 **Infrastructure Automation** improvements
- 📊 **Monitoring and Observability** enhancements
- 🔒 **Security** hardening measures
- 🚀 **Performance** optimizations
- 📚 **Documentation** updates

### Code Standards
- **Ansible**: Follow YAML best practices and use meaningful task names
- **Docker**: Multi-stage builds and security best practices
- **Kubernetes**: Follow K8s resource naming conventions
- **CI/CD**: Implement proper error handling and logging

---

## 🎯 Project Outcomes

This project demonstrates mastery of:

- **🏗️ Infrastructure as Code** with Ansible automation
- **🐳 Containerization** with Docker and multi-arch builds  
- **☸️ Kubernetes Orchestration** with production-ready configurations
- **🔄 GitOps Methodology** with ArgoCD continuous deployment
- **🤖 CI/CD Automation** with GitHub Actions

### Deployment Strategy Comparison

| Aspect | Docker Compose + Ansible | Kubernetes + GitOps |
|--------|--------------------------|-------------------|
| **Complexity** | Low-Medium | Medium-High |
| **Scalability** | Limited | Excellent |
| **Automation** | High | Very High |
| **Resource Usage** | Lower | Higher |
| **Production Ready** | Good | Excellent |

Choose the strategy that aligns with your requirements:
- **Docker Compose**: Development, testing, simple production deployments
- **Kubernetes**: Enterprise production, microservices, cloud-native applications

**Happy DevOps Engineering! 🚀**

For questions or contributions, visit the [GitHub repository](https://github.com/AbdullatifHabiba/Todo-List-nodejs).
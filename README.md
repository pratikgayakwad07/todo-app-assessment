# 📝 Todo Task Management Application

A full-stack todo application built with **React**, **Node.js**, **Express**, and **MySQL** — fully containerized with Docker and deployed on **AWS ECS Fargate** using **Terraform** and **GitHub Actions CI/CD**.

---

## 🌐 Live Application

> **URL:** [http://todo-app-dev-alb-1349096687.us-east-1.elb.amazonaws.com](http://todo-app-dev-alb-1349096687.us-east-1.elb.amazonaws.com)

---

## 🎯 Features

- ✅ **Create Tasks** — Add new tasks with title and description
- ✅ **View Tasks** — See your 5 most recent incomplete tasks
- ✅ **Complete Tasks** — Mark tasks as done with smooth animations
- ✅ **Beautiful UI** — Modern purple gradient design with responsive layout
- ✅ **Docker Support** — One-command local deployment with Docker Compose
- ✅ **Cloud Deployment** — Running on AWS ECS Fargate with RDS MySQL
- ✅ **CI/CD Pipeline** — Automated testing, image build, and deployment via GitHub Actions
- ✅ **Secure Secrets** — Database credentials stored in AWS Secrets Manager
- ✅ **Monitoring & Alerts** — CloudWatch metrics + SNS email alerts

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|:---|:---|
| React 18 | UI library |
| Redux Toolkit + RTK Query | State management & data fetching |
| Vite | Fast build tool |
| Nginx (Alpine) | Production web server |
| CSS3 | Custom animations and styling |

### Backend
| Technology | Purpose |
|:---|:---|
| Node.js 18 | JavaScript runtime |
| Express | REST API framework |
| MySQL 8.0 (AWS RDS) | Relational database |
| Jest | Unit testing framework |
| Supertest | Integration testing |

### DevOps & Infrastructure
| Technology | Purpose |
|:---|:---|
| Docker | Containerization |
| Docker Compose | Local multi-container orchestration |
| Terraform | Infrastructure as Code (IaC) |
| AWS ECS Fargate | Serverless container orchestration |
| AWS ECR | Private Docker image registry |
| AWS RDS MySQL | Managed relational database |
| AWS ALB | Application Load Balancer (path-based routing) |
| AWS Secrets Manager | Secure database credential storage |
| AWS CloudWatch | Container logs and performance monitoring |
| AWS SNS | Alert notifications (CPU/Memory alarms) |
| GitHub Actions | CI/CD automation pipeline |
| GitHub OIDC | Keyless AWS authentication (optional) |

---

## 🏗️ AWS Architecture

```
Internet (HTTP :80)
        │
        ▼
┌──────────────────────────────────────────────┐
│         Application Load Balancer (ALB)       │
│  ┌──────────────────────────────────────────┐ │
│  │  /api/*, /health ──► Backend TG (5000)   │ │
│  │  /* (default)    ──► Frontend TG (80)    │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
        │                          │
        ▼                          ▼
┌──────────────────┐    ┌──────────────────────┐
│  ECS Fargate     │    │  ECS Fargate         │
│  Frontend        │    │  Backend             │
│  (Nginx+React)   │    │  (Node.js Express)   │
│  Public Subnet   │    │  Private Subnet      │
└──────────────────┘    └──────────────────────┘
                                   │
                        ┌──────────▼──────────┐
                        │   AWS RDS MySQL 8.0  │
                        │   (Private Subnet)   │
                        │  ┌────────────────┐ │
                        │  │ AWS Secrets    │ │
                        │  │ Manager        │ │
                        │  │ (DB creds)     │ │
                        │  └────────────────┘ │
                        └─────────────────────┘
```

---

## 📁 Project Structure

```
todo-app-assessment/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection & auto-schema init
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/       # CORS, error handling
│   │   └── utils/           # Logger
│   ├── tests/
│   │   ├── unit/            # Unit tests (Jest + mocks)
│   │   └── integration/     # Integration tests (Supertest)
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React UI components
│   │   ├── features/        # Redux slices & RTK Query API
│   │   └── store/           # Redux store setup
│   ├── Dockerfile
│   ├── nginx.conf           # Production Nginx config
│   └── package.json
├── database/
│   └── init.sql             # Schema & seed data (used for local dev)
├── terraform/
│   ├── main.tf              # Root module — wires all modules together
│   ├── variable.tf          # Input variables
│   ├── output.tf            # Infrastructure outputs
│   ├── backend.tf           # S3 remote state backend
│   ├── provider.tf          # AWS + TLS provider config
│   ├── terraform.tfvars     # Variable values
│   └── modules/
│       ├── vpc/             # VPC, subnets, IGW, NAT Gateway
│       ├── sg/              # Security groups (ALB, Frontend, Backend)
│       ├── ALB/             # Application Load Balancer + target groups
│       ├── ecr/             # ECR repositories (frontend + backend)
│       ├── ecs/             # ECS Cluster, Fargate task definitions, services
│       ├── rds/             # RDS MySQL with Secrets Manager
│       ├── monitoring/      # CloudWatch alarms + SNS topic
│       └── oidc/            # GitHub Actions OIDC IAM role
├── .github/
│   └── workflows/
│       ├── deploy.yml       # CI/CD: Test → Build → Push ECR → Deploy ECS
│       ├── terraform.yml    # Terraform Apply on terraform/** changes
│       └── destroy.yml      # Manual Terraform Destroy (workflow_dispatch)
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start with Docker (Local)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/pratikgayakwad07/todo-app-assessment.git
cd todo-app-assessment

# 2. Start all services
docker-compose up --build

# 3. Access the application
# Frontend:   http://localhost:3000
# Backend API: http://localhost:5000
# Database:   localhost:3307

# 4. Stop the application
docker-compose down
```

The application auto-seeds with 5 sample tasks and is ready to use.

---

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 18+
- MySQL 8.0
- npm

### Backend

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

Update `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
```

```bash
# Initialize database (optional — backend auto-creates schema on startup)
mysql -u root -p < ../database/init.sql

# Start server
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
```

---

## ☁️ AWS Deployment (Terraform + GitHub Actions)

### 1. Provision Infrastructure

```bash
cd terraform

# Configure your variables
cp terraform.tfvars terraform.tfvars.local  # edit as needed

# Initialize and apply
terraform init
terraform plan
terraform apply
```

Key outputs after apply:
- `alb_dns_name` — Your application's public URL
- `ecr_frontend_repository_url` — Push frontend images here
- `ecr_backend_repository_url` — Push backend images here
- `github_actions_role_arn` — For OIDC authentication
- `rds_master_user_secret_arn` — Secrets Manager ARN for DB credentials

### 2. Configure GitHub Repository Secrets

Go to **GitHub → Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|:---|:---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

> **Optional (OIDC):** Set `AWS_ROLE_TO_ASSUME` to the `github_actions_role_arn` output for keyless authentication.

### 3. Deploy

Push to `main` branch — GitHub Actions automatically:
1. Runs backend unit tests (`npm run test:unit`)
2. Builds frontend production bundle (`npm run build`)
3. Builds Docker images for frontend and backend
4. Pushes images to Amazon ECR (tagged with commit SHA + `latest`)
5. Updates ECS Fargate services with rolling deployment
6. Waits for service stabilization

---

## 🔄 CI/CD Pipeline

```
Push to main branch
       │
       ▼
┌─────────────────┐
│   test job      │
│ ─────────────── │
│ npm run         │
│  test:unit      │
│                 │
│ npm run build   │
│  (frontend)     │
└────────┬────────┘
         │ success
         ▼
┌─────────────────────────────┐
│         deploy job          │
│ ─────────────────────────── │
│ Configure AWS credentials   │
│ Login to ECR                │
│ Docker build + push         │
│  frontend image             │
│ Docker build + push         │
│  backend image              │
│ ECS update-service          │
│  (frontend + backend)       │
│ Wait services-stable        │
└─────────────────────────────┘
```

---

## 🔌 API Endpoints

**Base URL (Production):** `http://todo-app-dev-alb-1349096687.us-east-1.elb.amazonaws.com/api`

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/tasks` | Get 5 most recent incomplete tasks |
| `GET` | `/tasks/all` | Get all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id/complete` | Mark a task as completed |
| `GET` | `/health` | Health check |

### Example Requests

**Create a task:**
```bash
curl -X POST http://todo-app-dev-alb-1349096687.us-east-1.elb.amazonaws.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Buy milk and eggs"}'
```

**Get recent tasks:**
```bash
curl http://todo-app-dev-alb-1349096687.us-east-1.elb.amazonaws.com/api/tasks
```

---

## 📊 Database Schema

```sql
CREATE TABLE tasks (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255)  NOT NULL,
  description  TEXT          NOT NULL,
  is_completed BOOLEAN       DEFAULT FALSE,
  created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at DESC),
  INDEX idx_is_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

> ⚠️ On AWS, the schema is **auto-created on first startup** by the backend — no manual SQL migration step needed. On local Docker, `init.sql` is mounted automatically.

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Unit tests only (no DB required — used in CI)
npm run test:unit

# Integration tests (requires live MySQL)
npm run test:integration

# All tests with coverage report
npm test
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test -- --run

# With coverage
npm run coverage
```

---

## 🔒 Security

| Concern | Implementation |
|:---|:---|
| DB Credentials | Stored in **AWS Secrets Manager**, injected as env vars into ECS tasks via `secrets` field — never in code or env files |
| Network | Backend in **private subnets**, not reachable from internet — only via ALB |
| DB Access | RDS security group only allows port 3306 from Backend ECS security group |
| CI/CD Auth | IAM User access keys in GitHub Secrets (OIDC role available as alternative) |
| Image Scanning | ECR scan-on-push enabled for all repositories |
| Encryption | RDS storage encrypted at rest |

---

## 📈 Monitoring & Alerts

CloudWatch alarms automatically trigger SNS notifications when:
- Backend CPU utilization > 70%
- Backend Memory utilization > 80%
- Frontend CPU utilization > 70%

Container logs are available in CloudWatch Log Groups:
- `/ecs/todo-app-dev-frontend`
- `/ecs/todo-app-dev-backend`

---

## 🐳 Docker Commands

```bash
# Build and start all services locally
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes (fresh database)
docker-compose down -v
```

---

## 👤 Author

**Pratik Gayakwad**
- GitHub: [@pratikgayakwad07](https://github.com/pratikgayakwad07)

---

## 🙏 Acknowledgments

- UI design inspired by modern task management applications
- Infrastructure follows AWS Well-Architected Framework principles
- Implements 12-factor app methodology
- CI/CD pipeline follows DevOps best practices
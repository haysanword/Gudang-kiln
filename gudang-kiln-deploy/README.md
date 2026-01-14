# Gudang Kiln - Warehouse Management System

Modern warehouse management system built with Next.js 15, Turso database, and Drizzle ORM.

## 🚨 Quick Setup (npm Permission Issue Detected)

Due to npm cache permission issues, please run these commands manually:

```bash
cd /Users/haysan/Downloads/gudang-kiln/gudang-kiln-app

# Fix npm permissions (one-time)
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"

# Install dependencies
npm install
```

## 🗄️ Database Setup

### Option A: Automated Setup (Recommended)

```bash
# Run the automated setup script
./setup-database.sh
```

This will:
- Login to Turso
- Create database
- Update .env.local automatically
- Run migrations
- Seed data

### Option B: Manual Setup

```bash
# Setup Turso database
turso auth login
turso db create gudang-kiln-db
turso db show gudang-kiln-db --url
turso db tokens create gudang-kiln-db

# Update .env.local with your Turso credentials
# Then run migrations
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

## 📁 Project Structure

```
gudang-kiln-app/
├── app/                    # Next.js App Router
├── components/            # React components
├── db/                    # Database schema & seeds
├── lib/                   # Utilities & helpers
├── types/                 # TypeScript types
└── ...config files
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Turso (Edge SQLite)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Validation**: Zod
- **Auth**: bcrypt (PIN-based)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database with dummy data
- `npm run db:studio` - Open Drizzle Studio

## 🎯 Features

- Multi-warehouse inventory management
- Stock IN/OUT transactions
- Real-time stock monitoring
- Audit & reconciliation
- Role-based access (Staff/Admin/Super Admin)
- Customizable theme
- Responsive design

## 📝 Environment Variables

Create `.env.local` file:

```env
TURSO_DATABASE_URL="your-database-url"
TURSO_AUTH_TOKEN="your-auth-token"
NEXT_PUBLIC_APP_NAME="Gudang Kiln"
```

## 🚀 Deployment

Ready to deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repo to Vercel dashboard.

## 📖 Documentation

- [BRD](../brain/83080184-4fc0-46cb-85bc-e519471f26a3/BRD.md)
- [PRD](../brain/83080184-4fc0-46cb-85bc-e519471f26a3/PRD.md)
- [Implementation Plan](../brain/83080184-4fc0-46cb-85bc-e519471f26a3/implementation_plan.md)
- [Tech Stack Guide](../brain/83080184-4fc0-46cb-85bc-e519471f26a3/tech_stack_guide.md)

## 📄 License

Private - Internal Use Only

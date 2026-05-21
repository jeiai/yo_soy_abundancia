# Yo Soy Abundancia

Plataforma web en Next.js para comunidad espiritual, journal digital, agenda, chat de acompañamiento y monetización.

## Ejecutar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:3000`.

## PostgreSQL con Prisma

El proyecto ya está configurado para PostgreSQL en:

```txt
prisma/schema.prisma
```

Variable requerida:

```txt
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
```

Después de configurar `DATABASE_URL`, ejecuta:

```bash
npm run db:push
```

Para revisar la conexión:

```txt
/api/db/health
```

En local:

```txt
http://localhost:3000/api/db/health
```

En Render:

```txt
https://yo-soy-abundancia.onrender.com/api/db/health
```

## Despliegue en Render

Usa el servicio como **Web Service**, no como Static Site.

Build Command:

```bash
npm install && npm run db:push && npm run build
```

Start Command:

```bash
npm run start
```

Variables de entorno en Render:

```txt
NEXT_PUBLIC_APP_URL=https://yo-soy-abundancia.onrender.com
DATABASE_URL=pegar-la-internal-database-url-de-render
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PRICE_JOURNAL=
MERCADO_PAGO_ACCESS_TOKEN=
OPENAI_API_KEY=
```

## Crear la base PostgreSQL en Render

1. En Render, crea un nuevo servicio **PostgreSQL**.
2. Copia la **Internal Database URL**.
3. En tu Web Service, entra a **Environment**.
4. Agrega o reemplaza `DATABASE_URL` con esa URL interna.
5. Guarda cambios.
6. Haz **Manual Deploy**.

Si usas el archivo `render.yaml`, Render puede crear el Web Service y la base desde Blueprint.

## Scripts útiles

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run db:push
npm run db:studio
```

## Rutas principales

```txt
/
/producto
/miembros
/agenda
/comunidad
/gracias
/login
/admin
/api/db/health
```

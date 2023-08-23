# 📓 atombin
A lightweight self-hostable pastebin for storing code in your preferred langage

## Technologies
- Next.js
- Tailwind
- Ace Editor
- Next Themes
- MongoDB (`mongoose`)

## Building
> **Note:** Docker compatibility is currently in progerss

1. Clone the repository
```
git clone git@github.com:atomisadev/atombin.git
```
2. `cd` into the repository
```
cd atombin
```
3. Install dependencies
```
npm install
```
4. Create a new file called `.env.local`
```
touch .env.local
```
5. Populate the `.env.local` file with environment variables like so
```env
MONGODB_URI=<your mongodb uri>
```
6. Run the development server
```
npm run dev
```

## Optional: in case of hosting on servers
You can use a tool like `pm2` to manage running the website. Or, you can host your own instance of this project on Vercel/Heroku.

## Self-hosted API
The API that is the backbone of this project is accessible by the developers.

Supported endpoints:

### Endpoint: /api/files
**Method:** GET

**Function:** This endpoint will return the slugs (id) of all the available atombin documents

### Endpoint: /api/files
**Method:** POST

**Function:** This endpoint will allow you to create new documents to atombin

**Body:**
- `content` - The actual content of the code

### Endpoint: /api/files/{id}
**Method:** GET

**Function:** Get the content of any existing post using its id

FROM node

WORKDIR /apps

ENV PORT=4002
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:Maqkrush2452@db.uhyhxbikzdgaspygeqen.supabase.co:5432/postgres
COPY package.json . 
COPY package-lock.json . 

RUN npm install && npm cache clean --force

# Bundle app source
COPY . .

CMD ["node","app.js"]
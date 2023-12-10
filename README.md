# Three Transform By Team Somehow

## Getting Started

### Start EthFlask

create .env

```zsh
cd EthFlask
pip install -r requirements.txt
flask run -p 5001
```

### Start Magic Deploy

```zsh
cd magic-deploy/node-working
npm i
```

Create .env in that folder

```
SECRET_KEY=wallet-secret-key
```

```zsh
node script.js
```

### Project Builder

```zsh
cd project-builder
pip install flask openai lighthouseweb3
flask run -p 5002
```

### Start Frontend

```zsh
cd frontend
npm i
npm run dev
```

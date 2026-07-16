# Renomear projeto para server ino

O código já usa **server ino** como nome. Falta renomear pastas no disco e no GitHub.

## 1. Feche o Cursor

A pasta `agenda-multipro` precisa estar livre para renomear.

## 2. Renomeie a pasta do projeto (PowerShell)

Abra o PowerShell e execute:

```powershell
# Move o repositório git para D:\server-ino
Move-Item -Path "D:\saas-agenda-multipro\agenda-multipro" -Destination "D:\server-ino"
```

Se `D:\server-ino` já existir, apague a pasta vazia `D:\saas-agenda-multipro\server-ino` antes (se houver).

## 3. Abra no Cursor

**File → Open Folder →** `D:\server-ino`

## 4. Renomeie no GitHub

1. Acesse https://github.com/HenriquePiazera/agenda-multipro/settings
2. **Repository name** → `server-ino` → **Rename**

## 5. Atualize o remote git

No terminal, dentro de `D:\server-ino`:

```powershell
git remote set-url origin https://github.com/HenriquePiazera/server-ino.git
git remote -v
```

## 6. (Opcional) Limpe a pasta pai antiga

A pasta `D:\saas-agenda-multipro` pode ficar com lixo (`package.json` wrapper, `.cursor`, etc.). Se não precisar mais:

```powershell
Remove-Item -Recurse -Force "D:\saas-agenda-multipro"
```

## 7. Deploy na Vercel

- **New Project** → importe `HenriquePiazera/server-ino`
- **Project Name:** `server-ino`
- **Root Directory:** `.` (vazio / raiz)
- URL: `https://server-ino.vercel.app`
- `NEXTAUTH_URL=https://server-ino.vercel.app`

## 8. Commit e push

```powershell
cd D:\server-ino
git add -A
git commit -m "rename project to server-ino"
git push -u origin main
```

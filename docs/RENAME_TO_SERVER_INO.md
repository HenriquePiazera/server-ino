# Projeto server-ino — nomenclatura

O projeto usa **`server-ino`** em todo lugar (pastas, npm, GitHub, Vercel).

## Estrutura atual

| Item | Valor |
|------|-------|
| Pasta local | `D:\server-ino` |
| Repositório GitHub | `HenriquePiazera/server-ino` |
| Nome npm | `server-ino` |
| Vercel Project Name | `server-ino` |
| URL padrão | `https://server-ino.vercel.app` |

## GitHub — renomear repositório

Se o remote ainda apontar para `agenda-multipro`:

1. Acesse https://github.com/HenriquePiazera/agenda-multipro/settings
2. **Repository name** → `server-ino` → **Rename**
3. No terminal:

```powershell
cd D:\server-ino
git remote set-url origin https://github.com/HenriquePiazera/server-ino.git
git remote -v
git push
```

## Pasta local — renomear (se ainda estiver em `saas-server-ino`)

Feche o Cursor e execute:

```powershell
Move-Item -Path "D:\saas-server-ino" -Destination "D:\server-ino"
```

Reabra **File → Open Folder →** `D:\server-ino`

# Projeto server-ino — nomenclatura

O projeto usa **`server-ino`** em todo lugar (pastas, npm, GitHub, Vercel).

## Estrutura

| Item | Valor |
|------|-------|
| Pasta local | `D:\saas-server-ino` (ou `D:\server-ino` após renomear) |
| Repositório GitHub | `HenriquePiazera/server-ino` |
| Remote git | `https://github.com/HenriquePiazera/server-ino.git` |
| Nome npm | `server-ino` |
| Vercel Project Name | `server-ino` |
| URL padrão | `https://server-ino.vercel.app` |

## Renomear no GitHub (uma vez)

1. Abra https://github.com/HenriquePiazera/agenda-multipro/settings
2. Em **Repository name**, digite `server-ino`
3. Clique **Rename**

O GitHub redireciona URLs antigas automaticamente. O remote local já aponta para `server-ino`.

Validar:

```powershell
cd D:\saas-server-ino
git fetch origin
git remote -v
```

## Pasta local (opcional)

Para usar `D:\server-ino` no disco, feche o Cursor e execute:

```powershell
Move-Item -Path "D:\saas-server-ino" -Destination "D:\server-ino"
```

Reabra **File → Open Folder →** `D:\server-ino`

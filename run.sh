# !/bin/bash
gulp dev &
pm2 start dev-server.json
pm2 logs &
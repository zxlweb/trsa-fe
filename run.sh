# !/bin/bash
pm2 start dev-server.json
pm2 logs &
gulp dev
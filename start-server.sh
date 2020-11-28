#! /bin/bash
gin --appPort 4201 --port 4202 -b go/bin/gin-live-reloading --path go/src/ --build go/src/app/
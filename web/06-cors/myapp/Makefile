
ngrok-bg-up:
	ngrok http 8080 > /dev/null &

ngrok-fg-up:
	ngrok http 8080

sed-endpoint:
	$(eval EGROK_DOMAIN="$(shell curl http://localhost:4040/api/tunnels | jq -r ".tunnels[0].public_url" | sed -E "s/(http|https):\/\/([^/]+).*/\2/")")
	sed -i '' -E "2 s/\'(http|https):\/\/([^/]+).*/\'https:\/\/$(EGROK_DOMAIN)\'/" public/javascripts/06.js
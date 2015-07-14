.PHONY: install user remove removefiles removeuser stopdaemon

install: user
	install -m 775 init.d/peercaststation /etc/init.d/peercaststation
	cp -R PeerCastStation /usr/local/lib/peercaststation
	chown -R peercaststation.peercaststation /usr/local/lib/peercaststation
	install -m 775 bin/peercaststation /usr/local/bin/peercaststation
	update-rc.d peercaststation defaults 98 02
	@echo "To start up PeerCastStation:\nservice peercaststation start"

stopdaemon:
	service peercaststation stop
	update-rc.d peercaststation defaults 98 02

# アンインストール
remove: stopdaemon removefiles removeuser

removefiles:
	rm -r /usr/local/lib/peercaststation
	rm /usr/local/bin/peercaststation
	rm /etc/init.d/peercaststation
	rm -r /etc/peercaststation

# ユーザーを削除する
removeuser:
	deluser peercaststation

user:
	if id -g peercaststation >/dev/null 2>&1;		\
	then							\
		echo -n;					\
	else							\
		addgroup --system --gid 7144 peercaststation;	\
	fi;							\
	if id -u peercaststation >/dev/null 2>&1; then		\
		echo -n;					\
	else							\
		adduser --system --home /etc/peercaststation --disabled-login \
			--uid 7144 --ingroup peercaststation peercaststation; \
	fi

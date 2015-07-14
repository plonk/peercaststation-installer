# Linux用 PeerCastStation バージョン 1.9.2 インストーラ

PeerCastStation の Linux用インストーラです。Ubuntu 14.04 でテストされています。

# あらかじめ必要なもの

起動コマンドが ruby で書かれているので ruby が必要です。

	sudo apt-get install ruby

# インストール方法

	sudo make install

とすると、peercaststation というユーザーが作成され、
次のような構成で PeerCastStation がインストールされます。

## ディレクトリ

* /usr/local/lib/peercaststation 以下にアセンブリ、ヘルプなど。
  当該バージョンの PeerCastStation の zip を展開したものと同じです。
* /etc/peercaststation 以下に設定ファイル。

## スクリプト

* /etc/init.d/peercaststation デーモンとして起動するためのinitスクリプト。
* /usr/local/bin/peercaststation 起動スクリプト。

起動コマンドは /usr/local/bin/peercaststation です。
また、マシンの起動時に自動的に起動するように init が設定されます。

アンインストールは以下のようにするとできます。peercaststation ユーザーも削除されます。

	sudo make remove

# 作者

予定地

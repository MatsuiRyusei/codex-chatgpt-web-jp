<h1 align="center">ChatGPT Web for Codex — 日本語版</h1>

<p align="center">
  <strong>ChatGPT Web（Pro を含む）を Codex のネイティブモデルとして利用。</strong><br>
  モデルのティアを切り替えながら、これまでのワークフローをそのまま使えます。
</p>

<p align="center">
  <a href="README.md">日本語</a> · <a href="README.en.md">English</a> · <a href="README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <a href="https://github.com/miuuyy/codex-chatgpt-web/actions/workflows/ci.yml"><img src="https://github.com/miuuyy/codex-chatgpt-web/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
  <img src="https://img.shields.io/badge/macOS-arm64%20%7C%20x64-black?logo=apple" alt="macOS arm64 and x64">
  <img src="https://img.shields.io/badge/Windows-x64-0078d4?logo=windows11" alt="Windows x64">
  <img src="https://img.shields.io/badge/Linux-x64-fcc624?logo=linux&logoColor=black" alt="Linux x64">
  <img src="https://img.shields.io/badge/Free_AI-no_API_fees-10a37f" alt="Free AI with no API fees">
</p>

> [!NOTE]
> このリポジトリは [miuuyy/codex-chatgpt-web](https://github.com/miuuyy/codex-chatgpt-web) をベースにした日本語ローカライズ版です。
> 元プロジェクトの MIT License と著作権表示を引き継いでいます。

Free / Go アカウントでは Codex のネイティブモデル選択画面に **ChatGPT Web — Luna** が表示されます。
reasoning セレクターを利用できるアカウントでは、契約内容に応じて **Instant**、**Medium**、**High**、
**Extra High**、**Pro** を利用できます。ブリッジは現在の Codex タスクのコンパイル済みコンテキストを
新しい ChatGPT Temporary Chat に送り、画像を添付し、表示可能な reasoning、ツール実行状況、Markdown を
同じ Codex タスクへストリーミングで返します。

<p align="center">
  <img src="assets/demo.gif" alt="ネイティブ Codex ハーネス上で動作する ChatGPT Web" width="960">
</p>

```text
Codex task ──Responses + SSE──▶ codex-chatgpt-web ──embedded browser──▶ ChatGPT
     ▲                                │                                      │
     └──────── native UI, context, images, tracing, and tool lifecycle ──────┘
```

Codex 側ではネイティブのタスク、コンテキストライフサイクル、UI、ツールハーネスを維持します。
ローカル Responses ブリッジは選択されたモデルのタスクだけを、そのタスクに紐づいた
ChatGPT Temporary Chat にルーティングします。Full モードでは、次の compaction 境界まで MCP が
ChatGPT を同じ Codex タスクのツールへ再接続します。

> [!TIP]
> 作者は **[ChatGPT Persona Voice](https://github.com/miuuyy/ChatGPT-Persona-Voice)** も公開しています。
> ChatGPT / Codex の音声をほぼリアルタイムで変更するローカルアプリで、アカウント、ブラウザーセッション、
> ChatGPT リクエストには触れません。

## 主な特徴

- **Codex のネイティブモデルとして動作。** ChatGPT Web は Codex のモデル選択画面から起動され、
  元のタスク UI、コンテキストライフサイクル、ストリーミング、トレース、ツール表示はそのまま維持されます。
- **MCP 経由で Codex ハーネス全体を利用。** Full モードでは、Pro を含むログイン中アカウントで利用可能な
  各 effort から、アクティブなタスクのファイルシステム、シェル、画像、承認、設定済みツール / アプリを利用できます。
- **継続的なタスクセッションとネイティブ compaction。** 連続したメッセージは、タスクに紐づいた
  1つの Temporary Chat を再利用します。コンテキスト境界では保持中のエージェントがチェックポイントを
  書き込んでから Codex が新しいチャットを開始し、チャットが閉じられていた場合は正規の Codex 履歴が
  フォールバックとして使われます。
- **クロスプラットフォームの統合ランチャー。** macOS、Windows、Linux のアプリからログイン、
  モデル設定、MCP ガイド、ヘルスチェック、安全な診断、最大5つのタスク別ブラウザータブを扱えます。
- **問題時は明示的に停止。** モデルやツールが見つからない場合、または ChatGPT UI が変更された場合は、
  別ルートや別機能へ暗黙に切り替えずエラーを表示します。End-to-end の確認項目は
  [release validation](docs/release-validation.md) を参照してください。

Temporary Chat は ChatGPT のプライバシーモードであり、匿名化やローカル推論ではありません。
プロンプトは引き続き OpenAI で処理され、アカウント設定および OpenAI の
[Temporary Chat ポリシー](https://help.openai.com/en/articles/8914046-temporary-chat-faq) が適用されます。
このプロジェクトは非公式であり、利用者は適用される OpenAI の規約とワークスペースポリシーを
遵守する責任があります。

## クイックスタート

公式のデスクトップランチャーをインストールまたは更新する場合は、元プロジェクトのリリースを利用できます。
既存インストールの更新・修復では、ランチャーを終了して同じコマンドを再実行してください。
ChatGPT プロファイルとランチャー設定を残したまま、アプリと内蔵ランタイムが置き換えられます。

**macOS / Linux**

```bash
curl -fsSL https://github.com/miuuyy/codex-chatgpt-web/releases/latest/download/install-launcher.sh | sh
```

**Windows PowerShell**

```powershell
irm https://github.com/miuuyy/codex-chatgpt-web/releases/latest/download/install-launcher.ps1 | iex
```

アプリでは次の3項目を完了します。

1. ランチャー内蔵の ChatGPT ブラウザーから直接ログインします。ログインページや ID プロバイダーの
   ウィンドウも同じランチャー管理のプライベートブラウザープロファイル内に留まり、別ブラウザーとの間で
   セッションはコピーされません。
2. ブラウザーのスモークテストを実行します。
3. **モデルをインストール** を押し、Codex を一度再起動して **ChatGPT Web — …** モデルを選択します。

セットアップ中、ランチャーは現在のアカウントで利用可能な ChatGPT コントロールを検出します。
Free / Go では Luna のみ、Pro はログイン中のアカウントで実際に公開されている場合だけ表示されます。
別ページの **MCP** は任意で、ターミナルコマンドを使わずに Full harness を設定できます。

パッケージ版ランチャーでは、ログインと ChatGPT モデルのターンを内蔵ブラウザー内で処理します。
モデル API キー、インストール済み Chrome / Chromium、システム Node / Bun、
プロジェクト管理のブラウザーダウンロードは不要です。

**日本語版をソースから実行**

```bash
git clone https://github.com/MatsuiRyusei/codex-chatgpt-web-jp.git && \
cd codex-chatgpt-web-jp && \
bun run app
```

このソース実行には Bun 1.4.0 が必要です。ロックされた依存関係をインストールしてアプリを起動します。

## モード

| モード | モデル | ローカル Codex ツール | 追加設定 |
| --- | --- | --- | --- |
| **Browser-only** | Free/Go: Luna、Plus: Instant–High、Pro: Extra High と Pro を追加 | なし。Codex に警告が表示されます | なし |
| **Full harness** | Free/Go: Luna、Plus: Instant–High、Pro: Extra High と Pro を追加 | 一覧にある全 effort（Pro を含む）で利用可 | OpenAI tunnel + ChatGPT connector |

モデル選択画面の各エントリには、固定の ChatGPT モードが1つ割り当てられます。
Codex 自体の Effort / Speed 行は引き続き表示されますが、それを変更しても選択中のブラウザーモデルが
暗黙に変わることはありません。Full モードでは利用可能なすべての effort に同じターン単位の MCP 機能が
提供されます。Pro にだけ別の制限や縮小されたツール契約が設定されることはありません。

## Full harness

Full モードでは、ChatGPT のツール呼び出しを公式の
[OpenAI tunnel-client](https://github.com/openai/tunnel-client) 経由で現在の Codex タスクへ戻します。
トンネルは outbound 接続であり、公開 IP の露出、受信ポートの開放、ルーターのポート転送は不要です。

> [!WARNING]
> **Codex Native2** という名前の**新しい**コネクタを作成し、権限を
> **Allow all actions** に設定してください。既存の **Codex Native** コネクタを
> 名前変更・更新・再利用しないでください。ChatGPT はコネクタ ID ごとに公開 MCP コントラクトを
> キャッシュします。また **Allow low-risk actions** では、コマンドやパッチが Codex ハーネスへ届く前に
> ブロックされます。

1. ランチャーの必須セットアップを完了します。
2. ランチャーで **MCP** を開きます。ChatGPT コネクタを利用するのと同じ OpenAI アカウントで
   Tunnel と通常の API キーを作成します。キーの作成自体は無料で、モデル API クレジットは消費しません。
3. Tunnel ID と API キーを貼り付け、**ハーネスを接続** を押します。
4. ChatGPT 設定で **Developer Mode** を有効にします。**Tunnel** を使う**新しい**コネクタを作成し、
   対象 Tunnel を選択、**Authentication** を **None** に設定し、名前を正確に **Codex Native2** とします。
5. 古い **Codex Native** コネクタがある場合は、そのまま残してください。名前変更や更新はしないでください。
   ChatGPT はコネクタ ID ごとに公開 MCP コントラクトをキャッシュし、このリリースでは新しい直接
   turn-token コントラクトを使います。**Codex Native2** の **Permissions** では **Allow all actions** を
   選択します。**Allow low-risk actions** ではコマンドとパッチがこのランタイムに届く前にブロックされます。
   外側の Codex ハーネスでは引き続きサンドボックスと承認が適用されます。
6. **ランタイムを検証** を実行します。検証では **Codex Native2** を厳密に選択します。
   **Codex Native** しか見つからない場合は、旧コネクタを受け入れず明示的な移行エラーになります。

書き込み / 変更操作には、ChatGPT ワークスペースと管理者ポリシー側でも許可が必要です。
[Developer mode と MCP apps](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)
も参照してください。予期しない承認プロンプトは、`--auto-approve-tool-calls` を明示的に有効にしない限り
失敗として扱われます。このオプションが押すのは **Allow once** だけで、恒久的な許可ではありません。

## 運用

安全なローカル診断には **アクティビティ**、End-to-end のヘルスチェックには
**設定 → 診断を実行** を利用します。設定画面から保持中のブラウザーターンのキャンセルや、
アンインストール前の Codex 連携削除も行えます。各ブラウザーチェックポイントでスクリーンショットが
必要な場合のみ `CODEX_CHATGPT_WEB_BROWSER_DIAGNOSTICS=1` を設定してください。

新規インストールではクロスバックエンド subagent に **Compatibility V1** を利用します。
**Native** は Codex 本来の feature 設定を保持し、プレーンテキストの Web-to-Web V2 delegation を有効にします。
プロトコルを変更したら Codex を再起動し、新しいタスクを開始してください。

```bash
codex-chatgpt-web subagents status
codex-chatgpt-web subagents compatibility-v1
codex-chatgpt-web subagents native
```

## 制限とセキュリティ

- これは OpenAI API ではなく、非公式のブラウザー自動化です。ChatGPT UI の変更により selector が
  動作しなくなる可能性があります。その場合、別モデルや別トランスポートへ暗黙に切り替えずエラーになります。
- ブラウザー状態は機密性の高いログイン情報です。loopback listener は同じローカルユーザーとして
  動作するプロセスからアクセスできます。ランチャープロファイルを共有せず、信頼できる端末で利用してください。
- リリースパッケージの対象は現在 macOS 13+（arm64/x64）、Windows x64、Linux x64 です。
  ランタイム、テスト、パッケージングは CI 上で3環境すべてを確認し、アカウント依存のブラウザー / MCP フローは
  別途 [release validation](docs/release-validation.md) で検証します。
- ビルドはまだプラットフォーム署名されていないため、Gatekeeper や SmartScreen が警告する場合があります。
  インストーラーはインストール前に公開 SHA-256 manifest を検証します。

Full モードを有効にする前に、[architecture](docs/architecture.md) と
[security model](docs/security-model.md) を確認してください。脆弱性は
[SECURITY.md](SECURITY.md) から報告してください。

## 開発

```bash
bun run app
bun run dev:launcher
bun run src/cli.ts dev status
bun run dev:chat compaction-lab "Reply with exactly: DEV READY"
bun run verify
bun run smoke:subagents
bun run app:package
```

`dev:launcher` は `~/.codex-chatgpt-web-dev` に2つ目のランチャープロファイルを作成します。
Electron state、ブラウザー Cookie / ログイン、ChatGPT アカウント、設定、sandbox 化された
`CODEX_HOME`、チャット、診断、broker、tunnel profile はすべて通常版と分離されます。
通常のランチャーと同時に実行でき、Responses daemon の起動や Codex の変更は行いません。
任意の Full セットアップでは、隔離された MCP tunnel だけを起動・監視し、
別の ChatGPT コネクタ名 `Codex Native2 DEV` を使います。

`dev:chat` は、名前付きで永続化される合成 outer-Codex harness です。現在の working tree を、
隔離されたランチャーブラウザー、Temporary Chat、prompt compiler、Responses parser、
compaction handler を通して実行します。任意の Full セットアップでは MCP connector と broker も検証し、
ツール効果は明示的な simulation receipt として返されます。Browser-only chat には outer tool はありません。
Responses listener を開いたり、`openai_base_url` を変更したり、稼働中 daemon を停止したり、
port 17841 を使用済みとして扱ったりしません。メッセージなしで起動すると `/status`、
`/fill 30000`、`/compact`、`/model`、`/reset` コマンドを利用できます。
**DEV** と表示されたウィンドウ内で一度ログインし、プロファイルを初期化してください。
シミュレーションのツールラウンドが必要な場合のみ、任意の Full harness を設定します。
ランチャーは DEV tunnel を待機状態に保ち、名前付きチャットが必要に応じて broker を接続します。
本番認証情報や `Codex Native2` コネクタが暗黙に再利用されることはありません。
詳細は [DEV chat harness](docs/dev-chat.md) を参照してください。

- [Architecture](docs/architecture.md)
- [DEV chat harness](docs/dev-chat.md)
- [Security model](docs/security-model.md)
- [Contributing](CONTRIBUTING.md)

## Star History

<a href="https://www.star-history.com/?repos=miuuyy%2Fcodex-chatgpt-web&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=miuuyy/codex-chatgpt-web&type=date&theme=dark&legend=top-left&sealed_token=hBVvg_eOjfMFDrfyeo5FPQkIwcvBEmXc6F7ZoOKnfFE4KPCs67o34w4XwVuM-bHGnKR-SKCAN_TSTWrzuqSBNU-RjNZCLT4f-xNs9qcDhciQtemxHKuuFj0N5YNqZIihdaQfakrh2ANhOrvP0K2LmLXX2zbsYyVaYZknyTnlYeIS_mOGvMcO32ZmPCHK">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=miuuyy/codex-chatgpt-web&type=date&legend=top-left&sealed_token=hBVvg_eOjfMFDrfyeo5FPQkIwcvBEmXc6F7ZoOKnfFE4KPCs67o34w4XwVuM-bHGnKR-SKCAN_TSTWrzuqSBNU-RjNZCLT4f-xNs9qcDhciQtemxHKuuFj0N5YNqZIihdaQfakrh2ANhOrvP0K2LmLXX2zbsYyVaYZknyTnlYeIS_mOGvMcO32ZmPCHK">
    <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=miuuyy/codex-chatgpt-web&type=date&legend=top-left&sealed_token=hBVvg_eOjfMFDrfyeo5FPQkIwcvBEmXc6F7ZoOKnfFE4KPCs67o34w4XwVuM-bHGnKR-SKCAN_TSTWrzuqSBNU-RjNZCLT4f-xNs9qcDhciQtemxHKuuFj0N5YNqZIihdaQfakrh2ANhOrvP0K2LmLXX2zbsYyVaYZknyTnlYeIS_mOGvMcO32ZmPCHK">
  </picture>
</a>

## 免責事項

これは独立したソフトウェアであり、OpenAI との提携・承認関係はありません。
自分自身のアカウントで、適用される
[利用規約](https://openai.com/policies/terms-of-use/) とワークスペースポリシーに従って使用してください。
認証やアクセス制御を回避するものではありません。

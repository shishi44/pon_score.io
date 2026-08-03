# CODEX_PROGRESS

## Current goal
- 添付画像の指示に合わせてスコアボードUIを更新し、配布用ZIPを作成する。

## Last known status
- 指定UI変更を実装・検証し、配布用ZIPまで作成済み。

## Completed steps
- デザイン参照として Wise を主、Cal を補助に選定。
- 左上マークのfavicon化、名前・得点・獲得ゲームドットの拡大と再配置。
- 得点ボタンをアイコンのみへ変更し、音声・下部操作を画面から削除。
- 中央履歴を上部セット数と同サイズにし、罫線と最新行強調を追加。
- 設定内に左右訂正、ライト／ダークモード、テーマ保存を追加。
- 1920×1080、1024×768、844×390で5ゲーム終了状態を確認。

## Important findings
- 既存ZIPにはソース一式ではなく、`index.html` とビルド済みCSS/JavaScriptが含まれる。
- 既存バンドルは維持し、`assets/custom-ui.css` と `assets/custom-ui.js` の上書き層で実装。
- 得点操作後の内部フォーカススクロールと小画面設定の二重スクロールをQA中に修正。
- ブラウザ警告・エラーなし。favicon、manifest、追加CSS/JS、音声のHTTP応答を確認。
- `outputs/pon_score.io-main-updated.zip` を作成。

## Open issues / next steps
- 将来大きく機能変更する場合は、保守性のため元のReactソース一式を入手する。

## Notes for future Codex sessions
- 元ZIPは `C:\Users\great\Downloads\pon_score.io-main.zip`。
- テーマは `pon-score-theme`、試合状態は既存の `pon-score-match-v1` に保存される。

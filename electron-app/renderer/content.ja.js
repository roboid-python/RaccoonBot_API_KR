window.CONTENT_JA = {
  nav: {
    home: "ラクーンボット概要",
    usage: "使用方法",
    peripherals: "追加装置",
    unplugged: "アンプラグドコーディング",
    plugged: "プラグドコーディング",
    specs: "ロボット仕様",
    control: "ロボット制御"
  },
  appTitle: "ラクーンボット使用ガイド",
  langLabel: "言語",
  pages: {
    home: {
      title: "ラクーンボット概要",
      html: `
        <p><strong>ラクーンボット(RaccoonBot)</strong>は超小型・超軽量の4軸(4自由度)ロボットアームです。
        Bluetooth 5.0通信方式で接続され、ロボット教育および研究環境に最適化された製品です。</p>
        <ul>
          <li>IoT環境で動作する無線ネットワークベースのシンクライアント(Thin Client)ロボットです。</li>
          <li>大容量バッテリーを内蔵しており、外部電源接続なしでも動作可能です。</li>
          <li><a href="https://robomationlab.com/" target="_blank">RobomationLAB</a>統合開発環境と連携し、コーディングおよびAI教育をすぐに始められます。</li>
          <li>ネットワークがない環境でもTeaching &amp; Playback機能によるアンプラグド学習が可能です。</li>
          <li>多様な作業に対応できるよう、複数種類のEnd-Effectorを装着できます。</li>
          <li>専用Peripheral装置(例:コンベアなど)と連携可能で、ロボット本体の電源で駆動するため別途の外部電源供給は不要です。</li>
          <li>初等教育レベルでも活用できるよう4自由度構造で設計されています。</li>
          <li>各軸の機械的な接続構造がシンプルで、KinematicsおよびInverse Kinematicsの解析が直感的です。</li>
          <li>iOSおよびAndroidスマート機器と互換性があります。</li>
          <li>RobomationLABのほか、ScratchやPython環境もサポートしています。</li>
        </ul>

        <h3>ラクーンボットの構造</h3>
        <p>ラクーンボットは4軸4関節ロボットで、4つの関節と上腕/前腕/エンドエフェクタ装着部で構成されています。</p>

        <h3>ラクーンボットの構成品</h3>
        <p>ラクーンボットには、ユーザーがアンプラグドコーディング(Unplugged Coding)からプラグドコーディング(Plugged Coding)まで学習するために必要な基本構成がすべて含まれています。</p>
        <ul>
          <li>ラクーンボット本体</li>
          <li>フィンガーグリッパー</li>
          <li>グリッパー接続ケーブル</li>
          <li>Mini Dongle+</li>
          <li>USB-C充電ケーブル</li>
          <li>ラクーンボットガイドステッカー2種</li>
          <li>円柱木製ブロック4種</li>
          <li>取扱説明書</li>
        </ul>

        <blockquote class="warn">
          <strong>注意!</strong> ラクーンボットの重量は約850gで、机から落下すると製品が破損したり、足に落下してけがをする恐れがあります。取り扱いには十分ご注意ください。
        </blockquote>
      `
    },
    usage: {
      title: "使用方法",
      html: `
        <h3>ラクーンボットの設置</h3>
        <p>ラクーンボットはすべての構成が完了した状態で提供されます。製品を梱包箱から取り出して電源を入れると、すぐに動作待機状態になり、そのまま使用できます。<br>
        アンプラグドコーディング(Unplugged Coding)はすぐに使用可能で、プラグドコーディング(Plugged Coding)は<strong>Mini Dongle+</strong>で接続して使用します。</p>

        <h3>モードと状態</h3>
        <p>ラクーンボットには初期待機状態と2種類の動作モードがあります。動作モードはコーディング(Coding)モード/アンプラグド(Unplugged)モードの2つに分かれます。</p>
        <ol>
          <li><strong>待機状態</strong> — 最初に電源を入れるとラクーンボットは待機状態(Standby Status)になります。待機モードでTeachボタンを押すと自動的にアンプラグドモードに切り替わり、別途の設定なしにすぐに学習・制御を開始できます。以前保存した動作を再生したり、新しい動作を追加・保存できます。</li>
          <li><strong>コーディングモード</strong> — Mini Dongle+に接続し、ユーザーが直接コーディングでラクーンボットを制御できます。RobomationLAB、Scratch、Python環境でコーディングを行うことができ、基礎から上級レベルのコーディング学習まで可能です。</li>
          <li><strong>アンプラグドモード</strong> — 複雑なコーディングなしにTeaching &amp; Playback機能を通じて様々なミッションを遂行し、ロボットアームの精巧な動作原理を簡単に学習・体験できます。コンベアなどの周辺装置との連携により実際の工場自動化システムを再現できます。</li>
        </ol>

        <h3>インターフェース</h3>
        <p>ラクーンボットはBluetooth 5.0で接続され、各構成要素は以下の通りです。</p>
        <table>
          <tr><th>番号</th><th>名称</th><th>説明</th></tr>
          <tr><td>1</td><td>PLAYボタン</td><td>学習した動作の再生/停止、ロボットに学習した動作を保存</td></tr>
          <tr><td>2</td><td>POWERボタン</td><td>電源オン/オフ、すべての動作を停止しホーム位置へ移動</td></tr>
          <tr><td>3</td><td>DELETEボタン</td><td>最近学習した動作1件削除、学習したすべての動作を削除</td></tr>
          <tr><td>4</td><td>状態LED</td><td>動作状態を表示</td></tr>
          <tr><td>5</td><td>モードLED</td><td>動作モードを表示</td></tr>
          <tr><td>6</td><td>充電LED</td><td>充電およびバッテリー状態を表示</td></tr>
          <tr><td>7</td><td>周辺装置接続部</td><td>周辺装置(例:コンベア)接続端子</td></tr>
          <tr><td>8</td><td>充電接続部</td><td>USB充電端子</td></tr>
          <tr><td>9</td><td>リセットスイッチ</td><td>電源リセットスイッチ</td></tr>
          <tr><td>10</td><td>TEACHボタン</td><td>関節角度を保存、グリッパー開閉と共に動作を保存、動作の途中に待機時間を追加</td></tr>
          <tr><td>11</td><td>エンドエフェクタ接続部</td><td>エンドエフェクタ(例:フィンガーグリッパー)を接続</td></tr>
          <tr><td>12</td><td>ジョイントLED</td><td>関節状態を表示</td></tr>
          <tr><td>13</td><td>グリッパー接続部</td><td>ラクーンボットと接続</td></tr>
          <tr><td>14</td><td>締めノブ</td><td>エンドエフェクタを固定</td></tr>
        </table>

        <h3>ボタン入力</h3>
        <p>ラクーンボットにはPower、Play、Delete、Teachの4つのボタンがあり、クリック(Click)/ダブルクリック(Double Click)/長押し(Long Click)の3種類の方式で動作します。</p>

        <h4>1. Powerボタン</h4>
        <table>
          <tr><th>入力方式</th><th>機能説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>ラクーンボットの電源オン</td><td>電源オフ状態</td></tr>
          <tr><td>クリック</td><td>すべての動作を停止、Homeへ移動</td><td>電源オン状態</td></tr>
          <tr><td>長押し</td><td>ラクーンボットの電源オフ</td><td></td></tr>
        </table>

        <h4>2. Playボタン</h4>
        <table>
          <tr><th>入力方式</th><th>機能説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>学習した動作の再生/停止</td><td>Playback</td></tr>
          <tr><td>ダブルクリック</td><td>学習した動作を無限リピート再生</td><td>Playback</td></tr>
          <tr><td>長押し</td><td>学習した動作をラクーンボット内部メモリに保存</td><td></td></tr>
        </table>

        <h4>3. Deleteボタン</h4>
        <table>
          <tr><th>入力方式</th><th>機能説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>最近学習した動作1件削除</td><td></td></tr>
          <tr><td>長押し</td><td>学習したすべての動作を削除</td><td></td></tr>
        </table>

        <h4>4. Teachボタン</h4>
        <table>
          <tr><th>入力方式</th><th>機能説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>関節角度を保存</td><td>Teaching</td></tr>
          <tr><td>ダブルクリック</td><td>グリッパー開閉と共に動作を保存</td><td></td></tr>
          <tr><td>長押し</td><td>動作の途中に待機時間を追加</td><td>1秒間隔でジョイントLEDとブザーが点滅</td></tr>
        </table>

        <h3>表示装置 (LED)</h3>
        <h4>1. 状態LED</h4>
        <table>
          <tr><th>色</th><th>動作</th><th>説明</th></tr>
          <tr><td>消灯</td><td>消灯</td><td>待機状態</td></tr>
          <tr><td>緑色</td><td>点灯</td><td>学習した動作を実行中</td></tr>
          <tr><td>緑色</td><td>点滅</td><td>学習した動作を繰り返し実行中</td></tr>
          <tr><td>青色</td><td>点灯</td><td>Bluetooth接続完了(待機中)</td></tr>
          <tr><td>青色</td><td>点滅</td><td>Bluetooth通信中</td></tr>
          <tr><td>オレンジ色</td><td>点灯</td><td>ロボットアームがHomeへ移動中</td></tr>
          <tr><td>オレンジ色</td><td>点滅</td><td>学習データを保存中</td></tr>
          <tr><td>レインボー色</td><td>点滅</td><td>保存データを削除中</td></tr>
          <tr><td>赤色</td><td>点滅</td><td>点検が必要</td></tr>
        </table>

        <h4>2. モードLED</h4>
        <table>
          <tr><th>色</th><th>動作</th><th>説明</th></tr>
          <tr><td>白色</td><td>点灯</td><td>待機状態</td></tr>
          <tr><td>緑色</td><td>点灯</td><td>アンプラグドモード</td></tr>
          <tr><td>黄色</td><td>点灯</td><td>アンプラグドモードの自動水平/垂直維持機能が有効</td></tr>
          <tr><td>青色</td><td>点灯</td><td>コーディングモード</td></tr>
          <tr><td>赤色</td><td>点滅</td><td>点検が必要</td></tr>
        </table>

        <h4>3. ジョイントLED</h4>
        <table>
          <tr><th>色</th><th>動作</th><th>説明</th></tr>
          <tr><td>白色</td><td>点灯</td><td>待機状態</td></tr>
          <tr><td>紫色</td><td>一度点灯</td><td>Teachボタン押下 / 関節角度保存</td></tr>
          <tr><td>緑色</td><td>点灯/点滅</td><td>アンプラグドモード / 動作中</td></tr>
          <tr><td>黄色</td><td>点灯/点滅</td><td>自動水平/垂直維持機能有効 / 動作中</td></tr>
          <tr><td>青色</td><td>点灯/点滅</td><td>コーディングモード / 動作中</td></tr>
          <tr><td>赤色</td><td>速い点滅</td><td>障害物検知</td></tr>
          <tr><td>赤色</td><td>遅い点滅</td><td>バッテリー切れ</td></tr>
        </table>

        <h3>エンドエフェクタ (End-Effector)</h3>
        <p>標準構成品であるフィンガーグリッパー(Finger Gripper)は、エンドエフェクタ装着部(End-Effector Mount)に正確に合わせて差し込み、締めノブ(Clamping Knob)を時計回りに回して固定します。取り外す際は反時計回りに回します。
        グリッパー接続部とエンドエフェクタ接続部は専用ケーブルで接続し、ケーブルは消耗品のため繰り返し使用で損傷することがあり、必要に応じて交換してください。</p>

        <h3>初期位置 (Home Position)</h3>
        <p>ラクーンボットの電源を入れると、ロボットアームは自動的にホーム(Home)位置へ移動します。ホーム位置はロボットが動作を開始する前の基準姿勢です。</p>

        <h3>充電</h3>
        <p>ラクーンボットはUSB-Cポートで充電します。USB 5V/3A規格の充電器の使用を推奨し、満充電まで約3時間かかります。</p>
        <blockquote class="warn">
          <strong>注意:</strong> 急速充電器(高電圧充電器)を使用すると電源回路が損傷する恐れがあります。必ずUSB 5V/3A規格の充電器を使用してください。充電ポートに6V以上の電圧が入力されると保護回路が作動し、充電が自動的に遮断されます。
        </blockquote>

        <h4>充電LED</h4>
        <table>
          <tr><th>色</th><th>動作</th><th>ケーブル状態</th><th>説明</th></tr>
          <tr><td>消灯</td><td>消灯</td><td>なし</td><td>バッテリー十分</td></tr>
          <tr><td>赤色</td><td>遅い点滅</td><td>なし</td><td>バッテリー普通</td></tr>
          <tr><td>赤色</td><td>通常点滅</td><td>なし</td><td>バッテリー低下</td></tr>
          <tr><td>赤色</td><td>速い点滅</td><td>なし</td><td>バッテリー切れ</td></tr>
          <tr><td>消灯</td><td>消灯</td><td>接続済</td><td>充電完了</td></tr>
          <tr><td>赤色</td><td>点灯</td><td>接続済</td><td>充電中</td></tr>
        </table>
      `
    },
    peripherals: {
      title: "追加装置",
      html: `
        <h3>エンドエフェクタ (End-Effector)</h3>
        <p>エンドエフェクタはラクーンボットの最先端に装着され、実際に物体をつかんだり、離したり、移動させたりする役割を担う装置です。交換可能な構造で設計されており、作業目的に応じて様々な形態の装置を簡単に装着・交換できます。フィンガーグリッパー(Finger Gripper)が標準で提供されます。</p>

        <h3>フィンガーグリッパー (Finger Gripper)</h3>
        <p>ラクーンボットの標準エンドエフェクタで、2本のグリッピングアーム(Gripping Arm)を使って物体をつかんだり離したりします。</p>
        <ul>
          <li><strong>2点対称構造</strong> — 2本のグリッピングアームが同時に内側へ動き、物体を安定して固定。小型ブロック、ボール、キューブなど様々な形状の物体をつかむのに適しています。</li>
          <li><strong>モジュール式装着方式</strong> — エンドエフェクタ装着部に簡単に結合、専用工具なしで着脱可能。本体下部に電源および制御信号を伝達する4ピンコネクタ。</li>
          <li><strong>Teaching &amp; Playback連携</strong> — アンプラグドモードで学習したグリッパーの動作状態(つかむ/離す)が自動的に記録され、再生時に同じ動作を再現。</li>
        </ul>

        <h3>周辺装置 (Peripheral Device)</h3>
        <p>周辺装置はラクーンボット本体に接続され、ロボットアームに新しい機能を拡張する装置です。仕分け、移動、積載などの自動化実習に適しており、交換可能(モジュール)な構造で設計されています。4ピンコネクタを通じて電源と制御信号を供給され、Teaching &amp; Playback機能でも動作状態が一緒に記録されます。</p>

        <h3>コンベア (Conveyor)</h3>
        <p>ラクーンボットと連携して物体を自動的に移動させる周辺装置です(発売予定)。周辺装置接続部(Peripheral Port)を通じて電源と制御信号を供給されます。</p>
        <ul>
          <li><strong>双方向制御</strong> — 正方向(Forward)または逆方向(Reverse)に切り替え</li>
          <li><strong>速度制御</strong> — コーディングまたはアプリで回転速度を調整</li>
          <li><strong>自動動作連携</strong> — ラクーンボットの動作に合わせてコンベアが自動的に動作</li>
          <li><strong>Teaching &amp; Playback対応</strong> — アンプラグドモードで回転方向/速度が自動保存・再生</li>
        </ul>

        <h4>コンベアボタン入力</h4>
        <table>
          <tr><th>入力方式</th><th>機能説明</th><th>備考</th></tr>
          <tr><td>一度押す</td><td>開始 / 停止</td><td>基本動作</td></tr>
          <tr><td>長押し</td><td>進行方向反転</td><td>動作中</td></tr>
          <tr><td>長押し</td><td>進行方向反転後に動作開始</td><td>停止状態</td></tr>
        </table>

        <blockquote class="note">
          <strong>参考:</strong> アンプラグドモードでは速度制御機能は適用されず、コンベアの回転方向情報のみが保存されます。
        </blockquote>
        <blockquote class="warn">
          <strong>注意:</strong> 過度な荷重は製品破損の原因になることがあります。
        </blockquote>
      `
    },
    unplugged: {
      title: "アンプラグドコーディング",
      html: `
        <h3>アンプラグド(Unplugged)モード</h3>
        <p>複雑なコーディングなしにTeaching &amp; Playback機能を通じて様々なミッションを遂行し、ロボットアームの精巧な動作原理を簡単に学習・体験できます。コンベアなどの周辺装置との連携により実際の工場自動化システムを再現できます。</p>

        <h4>アンプラグドモードを始める</h4>
        <ol>
          <li><strong>最初から新しい動作を保存する場合:</strong> 待機状態でTEACHボタンを押して新しい関節角度を保存します。保存が完了すると自動的にアンプラグドモードに入ります。</li>
          <li><strong>内部メモリに保存済みの動作に続けて保存する場合:</strong> 待機状態でPLAYボタンを押して保存された動作を再生します。再生が完了すると自動的にアンプラグドモードに切り替わります。</li>
        </ol>
        <p>アンプラグドモードに正常に入ると、モードLEDとジョイントLEDが緑色に点灯します。</p>

        <h3>Teaching &amp; Playback</h3>
        <p>ユーザーがラクーンボットの動作を直接教え(Teaching)、保存された動作をそのまま再生(Playback)できる機能です。TEACHボタンで関節位置を段階的に保存し、PLAYボタンで順番に再生します。</p>

        <h4>Teaching</h4>
        <p>TEACHボタンを押すと、その瞬間のロボットの姿勢と状態が保存されます。最大250個の動作を保存でき、上限を超えると通知音が鳴ります。</p>
        <table>
          <tr><th>入力方式</th><th>説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>現在の関節角度を保存</td><td></td></tr>
          <tr><td>ダブルクリック</td><td>関節角度を保存 + グリッパーOn/Offトグル</td><td>グリッパーが開いた(Off)状態から開始</td></tr>
          <tr><td>長押し</td><td>関節角度を保存 + 待機時間を設定</td><td>1秒間隔でLED/ブザーが点滅</td></tr>
        </table>

        <h4>Playback</h4>
        <p>PLAYボタンで学習した動作を再生します。再生は常にHOME位置から始まり、完了するとHome位置に戻ります。</p>
        <table>
          <tr><th>入力方式</th><th>説明</th><th>備考</th></tr>
          <tr><td>クリック</td><td>学習した動作を再生 / 再生中に再度押すと即座に停止</td><td></td></tr>
          <tr><td>ダブルクリック</td><td>学習した動作を無限リピート</td><td></td></tr>
          <tr><td>長押し</td><td>現在学習した動作を内部メモリに保存</td><td>保存中は状態LEDがオレンジ色に点滅</td></tr>
        </table>
        <blockquote class="note"><strong>参考:</strong> 内部メモリには最後に保存された動作のみが保持され、新しい動作を保存すると既存のデータは削除されます。</blockquote>

        <h4>安全停止機能 (Smart Stop)</h4>
        <p>アンプラグドモードで動作中に障害物や外部干渉によって正常な動作ができなくなると、自動的に動作を停止します。この機能はアンプラグドモードでのみ動作し、プラグドモードでは無効化されるため、機構的な衝突や過負荷に注意する必要があります。作動時はジョイントLEDが赤色に速く点滅し、警告音が鳴ります。</p>

        <h4>動作の削除</h4>
        <table>
          <tr><th>入力方式</th><th>説明</th></tr>
          <tr><td>クリック</td><td>最近の動作1件を削除</td></tr>
          <tr><td>長押し</td><td>すべての動作を削除(状態LEDがレインボー色に点滅)</td></tr>
        </table>

        <h3>内部メモリに保存された動作の読み込み</h3>
        <ol>
          <li>ラクーンボットの電源を入れます。待機状態に入るとモードLEDとジョイントLEDが白色に点灯します。</li>
          <li>TEACHボタンを押していない待機状態でPLAYボタンを押すと、最後に学習した動作が再生されます。ダブルクリックで無限リピート再生されます。</li>
          <li>再生が完了するとアンプラグドモードに切り替わり、Home位置に戻ります。その後TEACHボタンで新しい動作を続けて保存できます。</li>
        </ol>

        <h3>自動水平/垂直維持機能 (Auto Leveling Function)</h3>
        <p>アンプラグドモードでジョイント4(Joint 4)を自動的に調整し、物体をより安定して扱えるようにします。電源がオフの状態からオンにするときのみ設定できます。</p>
        <ul>
          <li><strong>自動垂直維持機能:</strong> PLAYボタンを押したままPOWERボタンを押して電源を入れます。</li>
          <li><strong>自動水平維持機能:</strong> DELETEボタンを押したままPOWERボタンを押して電源を入れます。</li>
        </ul>
        <p>有効化されると状態LEDとジョイントLEDが黄色に点灯し、その後TEACHボタンまたは動作の読み込みでアンプラグドモードに入ると姿勢制御機能が動作します。</p>
        <blockquote class="note"><strong>参考:</strong> 自動水平/垂直維持機能は補助機能であり、応答速度が遅めのため、精密作業では注意して使用してください。</blockquote>
      `
    },
    plugged: {
      title: "プラグドコーディング",
      html: `
        <h3>RobomationLAB</h3>
        <p><a href="https://robomationlab.com/" target="_blank">RobomationLAB</a>はChromeウェブブラウザベースの統合開発環境です。ロボットハードウェアを抽象化した「Roboidモデル」を活用し、コードの解釈・実行を通じてロボットをリアルタイムに制御できます。</p>

        <h4>Block Composer (ブロックコンポーザー)</h4>
        <p>ブロックコーディングでロボットを簡単かつ迅速に制御し、基礎を学習できるツールです。</p>
        <ul>
          <li>フィジカルコンピューティングに最適化された開発環境</li>
          <li>ブロックのドラッグ&amp;ドロップ方式で初心者でも簡単にコーディング可能</li>
          <li>JavaScript、Pythonスクリプトコードへ自動変換</li>
          <li>ロボットごとに用意されたブロック集と様々な体験例</li>
          <li>コード実行によるリアルタイム結果確認</li>
          <li>AIベースのスクリプトコード分析による最適化フィードバック</li>
        </ul>

        <h4>Script Composer (スクリプトコンポーザー、公開予定)</h4>
        <p>スクリプトコーディングでロボットを制御し、コーディングの基礎を学習できるツールです。JavaScript/Pythonエディタを同時に提供し、コード自動補完機能をサポートします。</p>

        <h4>プログラムの主な特徴</h4>
        <ul>
          <li>Chromeウェブブラウザベースで、OSの制約なく利用可能</li>
          <li>ウェブシリアル通信ベースで、Mini Dongle+を通じてロボットを直接制御</li>
          <li>ロボットの種類や台数に制限なく、複数台を同時に接続して制御可能</li>
        </ul>

        <h3>BLE接続</h3>
        <h4>Step 1. ドングル接続</h4>
        <p>PCにMini Dongle+を接続した後、ラクーンボットを近くに置くと状態LEDが青色に変わり、自動的にペアリングされます。Block Composerで使用するには、Chromeブラウザ上でMini Dongle+に対するWebシリアルポートの権限を許可する必要があります。</p>
        <ol>
          <li>上部メニューの<strong>ドングルを探す</strong>ボタンをクリック</li>
          <li>一覧から接続するMini Dongle+を選択し、<strong>接続</strong>ボタンをクリック</li>
          <li>画面が更新され、ラクーンボットとMini Dongle+の接続が完了</li>
        </ol>

        <h4>Step 2. ドングル接続の確認</h4>
        <p>ドングルが接続されると、ブラウザ上部タブにシリアルポートアイコンが表示され、左下のアイコンに緑色のランプが点灯します。一度接続されると、以後は自動的に再接続されます。ドングルが既に他のプログラムに接続されている場合は接続に失敗するため、そのプログラムで接続を解除してから再度試してください。</p>

        <h4>Step 3. ラクーンボット接続</h4>
        <ol>
          <li>上部メニューの<strong>ロボット選択</strong>ボタンをクリック</li>
          <li>一覧から<strong>ラクーンボット</strong>を選択し、<strong>追加</strong>ボタンをクリック</li>
          <li>画面左側にラクーンボットのブロック集が追加され、右側で接続されたロボット情報を確認可能</li>
        </ol>

        <h3>Block Composerの使い方</h3>
        <h4>ブロックコーディング</h4>
        <p>ブロック集から使いたいブロックをドラッグしてコーディングエリアにドロップします。他のブロックと正しく接続されて初めてコードに反映され、JavaScriptまたはPythonコードへリアルタイムに変換された結果を確認できます。</p>
        <blockquote class="tip"><strong>TIP:</strong> 複数のブロックを同時に選択するには、Shiftキーを押しながらクリックしてください。</blockquote>
        <blockquote class="note"><strong>参考:</strong> ブロックは必ず「開始」または「無限リピート」ブロックと結合されて初めてコードに反映されます。</blockquote>

        <h4>コード実行</h4>
        <p>上部メニューの<strong>実行</strong>ボタンをクリックすると、リアルタイムでロボットの動作を確認できます。再度クリックするか、コーディングエリアをクリックすると実行が停止します。</p>

        <h4>ファイル</h4>
        <ul>
          <li><strong>新規作成</strong> — コードを初期化(ロボット接続や設定は維持)</li>
          <li><strong>保存 / 名前を付けて保存</strong> — ローカルストレージに保存</li>
          <li><strong>読み込み</strong> — ローカルストレージからファイルを読み込み</li>
          <li><strong>初期化</strong> — 作業内容とプログラムデータをすべて初期化</li>
        </ul>

        <h4>編集</h4>
        <ul>
          <li><strong>元に戻す</strong> (Ctrl+Z)</li>
          <li><strong>やり直す</strong> (Ctrl+Y)</li>
        </ul>

        <h4>設定</h4>
        <ul>
          <li><strong>言語</strong> — English / 韓国語を選択可能</li>
          <li><strong>ドングル</strong> — 接続されたドングルを強制的に切断または再接続</li>
        </ul>

        <h3>Block Composer ラクーンボット例</h3>
        <ol>
          <li>ラクーンボットブロックを追加した後、上部メニューの<strong>例</strong>ボタンをクリック</li>
          <li>例の一覧から学習したい例を選択</li>
          <li>コーディングエリアで例のブロックを確認、複数行コメントブロックで説明を確認、実行ボタンで動作を確認</li>
        </ol>

        <h3>ラクーンボット ジョイスティックAPP</h3>
        <p>スマートフォンでラクーンボットの各関節を自由に動かし、周辺装置と連携してロボット制御を体験できる専用アプリです。iOSとAndroidの両方に対応しています。</p>

        <h3>ラクーンボット アップデート</h3>
        <p>専用モバイルアプリ(DFU App)を通じて最新のファームウェアや機能を簡単にアップデートできます。iOSとAndroidの両方に対応しています。
        <a href="https://robomation.net/?page_id=17403" target="_blank">DFUアプリの案内へ</a></p>
      `
    },
    specs: {
      title: "ロボット仕様",
      html: `
        <h3>作業領域 (Workspace)</h3>
        <p>作業領域は標準のフィンガーグリッパーが閉じた状態で測定されています。グリッパーの装着有無や種類によって作業領域が一部異なる場合があります。(距離単位:mm)</p>

        <h3>ベース座標系 (Base Coordinate System)</h3>
        <p>ラクーンボットはベース座標系を基準に動作します。ロボットベース座標系の原点はユーザーの作業テーブル平面に位置します。</p>

        <h3>寸法 (Dimensions)</h3>
        <p>キネマティクス(Kinematics/Inverse Kinematics)計算時のサイズパラメータとして使用されます。グリッパーの種類によってエンドエフェクタの中心位置が一部異なる場合があり、RobomationLABではこれを自動的に補正します。(距離単位:mm)</p>

        <h3>仕様 (Specifications)</h3>
        <h4>1. Robotic Arm</h4>
        <table>
          <tr><th>項目</th><th>内容</th><th>詳細</th></tr>
          <tr><td>サイズ</td><td>93mm × 118mm × 180mm</td><td>W × D × H</td></tr>
          <tr><td>重量</td><td>825g</td><td>グリッパー除く</td></tr>
          <tr><td>作業領域</td><td>半径:240°、距離:295mm</td><td>フィンガーグリッパー含む</td></tr>
          <tr><td>軸数 (axes)</td><td>4軸</td><td></td></tr>
          <tr><td>自由度</td><td>4 DOF</td><td>Degrees of Freedom</td></tr>
          <tr><td>関節精度</td><td>0.0440°</td><td></td></tr>
          <tr><td>エンコーダ精度</td><td>0.0879°</td><td></td></tr>
          <tr><td>通信</td><td>BLE 5.0</td><td>iOS / Android機器対応</td></tr>
          <tr><td>バッテリー</td><td>リチウムイオン</td><td></td></tr>
          <tr><td>充電電圧</td><td>5V</td><td>USB-C充電端子</td></tr>
          <tr><td>関節駆動</td><td>マイクロステップ駆動ステッピングモーター</td><td>減速機内蔵</td></tr>
          <tr><td>サウンド</td><td>88鍵ピアノサウンド、メロディ</td><td></td></tr>
          <tr><td>アンプラグドコーディング</td><td>Teaching &amp; Playback</td><td></td></tr>
          <tr><td>プラグドコーディング</td><td>RobomationLAB, Scratch, Python</td><td></td></tr>
          <tr><td>エンドエフェクタ</td><td>フィンガーグリッパーなど</td><td></td></tr>
          <tr><td>周辺装置</td><td>コンベアなど</td><td></td></tr>
        </table>

        <h4>2. 軸仕様 (Axis Parameters)</h4>
        <table>
          <tr><th>軸</th><th>可動範囲</th></tr>
          <tr><td>Joint 1</td><td>-120° ~ +120°</td></tr>
          <tr><td>Joint 2</td><td>-90° ~ +30°</td></tr>
          <tr><td>Joint 3</td><td>-150° ~ 0°</td></tr>
          <tr><td>Joint 4</td><td>-105° ~ +105°</td></tr>
        </table>

        <blockquote class="warn"><strong>注意:</strong> 本書に記載された仕様や機能は、製品の性能向上や品質改善のため予告なく変更されることがあります。</blockquote>

        <h3>トラブルシューティング</h3>
        <p>カスタマーセンター: ☎️ +82-1551-1651 (営業時間 午前10:00~午後5:00、昼休み 午後12:00~午後1:00)</p>

        <h4>1. 電源が切れない、またはロボットが異常動作するとき</h4>
        <p>クリップなどの工具でリセットスイッチを押すと、強制的に電源を切ることができます。その後電源が再び入り、初期状態で再起動します。</p>

        <h4>2. アンプラグドモード動作中の停止とHome位置への復帰</h4>
        <p>アンプラグドモードで動作中にPOWERボタンを押すと、すべての動作を停止しHOME位置へ移動します。</p>

        <h4>3. 状態/モードLEDが赤色に点滅する場合</h4>
        <table>
          <tr><th>状態LED</th><th>モードLED</th><th>説明</th><th>対処法</th></tr>
          <tr><td>消灯</td><td>赤色点滅</td><td>異常な充電電圧</td><td>充電器の出力電圧が5Vか確認してください</td></tr>
          <tr><td>赤色点滅</td><td>消灯</td><td>内部通信エラー</td><td>リセット後も再発する場合はカスタマーセンターへ</td></tr>
          <tr><td>赤色点滅</td><td>赤色点滅</td><td>データエラー</td><td>リセット後も再発する場合はカスタマーセンターへ</td></tr>
        </table>
      `
    },
    control: {
      title: "ロボット制御",
      html: `
        <p>ウェブカメラで手の動きを認識し、ラクーンボットをリアルタイムで操作する<code>camera_control.py</code>プログラムを実行します。
        実行すると別ウィンドウのOpenCV画面(HUD)が開き、その画面でカメラ制御とロボット操作を行います。</p>

        <h4>操作方法</h4>
        <ul>
          <li><strong>左右移動 (Y軸):</strong> 手を画面の左右に動かすとラクーンボットも左右に移動</li>
          <li><strong>上下移動 (Z軸):</strong> 手を上下に動かすとラクーンボットも上下に移動</li>
          <li><strong>前後移動 (X軸):</strong> 手をカメラに近づけると前進、遠ざけると後退</li>
          <li><strong>グリッパー制御:</strong> 拳を握る → グリッパーが閉じる / 指を開く → グリッパーが開く</li>
          <li><strong>終了:</strong> ウェブカメラ画面で<kbd>ESC</kbd>または<kbd>q</kbd>キー</li>
        </ul>

        <blockquote class="note"><strong>参考:</strong> ラクーンボットが接続されていない場合はシミュレーションモード(オフライン)で実行され、ロボットなしでも座標マッピングとUI動作をテストできます。</blockquote>

        <div class="control-panel">
          <button id="btn-start-camera" class="btn btn-primary">カメラ制御を開始</button>
          <button id="btn-stop-camera" class="btn btn-danger" disabled>停止</button>
          <span id="camera-status" class="status-badge status-idle">待機中</span>
        </div>
        <pre id="camera-log" class="log-box"></pre>
      `
    }
  }
};

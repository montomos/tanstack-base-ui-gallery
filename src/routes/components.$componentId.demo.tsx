import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Code,
  Copy,
  EyeOff,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@base-ui-components/react/button";

export const Route = createFileRoute("/components/$componentId/demo")({
  component: ComponentDemo,
});

// 各コンポーネントのデモ実装
const componentDemos: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
  dialog: DialogDemo,
  tabs: TabsDemo,
  select: SelectDemo,
  accordion: AccordionDemo,
  "alert-dialog": AlertDialogDemo,
  menu: MenuDemo,
};

function ComponentDemo() {
  const { componentId } = Route.useParams();
  const [showCode, setShowCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const DemoComponent = componentDemos[componentId];

  if (!DemoComponent) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            デモが見つかりません
          </h1>
          <Link
            to="/components/$componentId"
            params={{ componentId }}
            className="text-cyan-400 hover:text-cyan-300"
          >
            コンポーネント詳細に戻る
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    // デモのコードをコピー（実際の実装では、デモのコードを取得）
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Storybook風のヘッダー */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/components/$componentId"
                params={{ componentId }}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">{componentId}</span>
              </Link>
              <div className="h-6 w-px bg-slate-700"></div>
              <span className="text-sm text-gray-400">Demo</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                title={showCode ? "コードを非表示" : "コードを表示"}
              >
                {showCode
                  ? <EyeOff className="w-4 h-4" />
                  : <Code className="w-4 h-4" />}
              </Button>
              <Button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                title={isFullscreen ? "フルスクリーンを解除" : "フルスクリーン"}
              >
                {isFullscreen
                  ? <Minimize2 className="w-4 h-4" />
                  : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* デモエリア */}
      <div className="flex h-[calc(100vh-57px)]">
        {/* メインコンテンツ */}
        <div
          className={`flex-1 overflow-auto ${
            showCode ? "border-r border-slate-700" : ""
          }`}
        >
          <div
            className={`p-8 bg-slate-950 ${
              isFullscreen ? "min-h-full" : "min-h-[600px]"
            } flex items-center justify-center`}
          >
            <div className="w-full max-w-4xl">
              <DemoComponent />
            </div>
          </div>
        </div>

        {/* コードパネル */}
        {showCode && (
          <div className="w-1/2 border-l border-slate-700 bg-slate-900 overflow-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">コード</span>
              </div>
              <Button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors"
              >
                {copied
                  ? (
                    <>
                      <Check className="w-4 h-4" />
                      コピーしました
                    </>
                  )
                  : (
                    <>
                      <Copy className="w-4 h-4" />
                      コピー
                    </>
                  )}
              </Button>
            </div>
            <div className="p-4">
              <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-cyan-300 text-sm">
                  {`// ${componentId} コンポーネントのデモコード\n// 実装は各デモコンポーネントを参照してください`}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Button デモ
function ButtonDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Button デモ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">サイズ</h3>
            <div className="flex gap-4 items-center">
              <Button className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded">
                小
              </Button>
              <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                中
              </Button>
              <Button className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                大
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              バリアント
            </h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                プライマリ
              </Button>
              <Button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                セカンダリ
              </Button>
              <Button className="px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg">
                アウトライン
              </Button>
              <Button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                危険
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">状態</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                通常
              </Button>
              <Button
                disabled
                className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed opacity-50"
              >
                無効
              </Button>
              <Button
                onClick={() => setClicked("clicked")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                {clicked === "clicked" ? "クリックされました！" : "クリック"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Input デモ
function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Input デモ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              基本的な使い方
            </h3>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="テキストを入力..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400 mt-2">
              入力値: <span className="text-cyan-400">{value || "(空)"}</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">サイズ</h3>
            <div className="space-y-3">
              <input
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="小"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="中"
              />
              <input
                className="w-full px-6 py-3 text-lg border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="大"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dialog デモ
function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Dialog デモ</h2>
        <div className="space-y-6">
          <Button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            ダイアログを開く
          </Button>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  ダイアログ
                </h3>
                <p className="text-gray-300 mb-6">
                  これはダイアログのデモです。Base UI
                  ComponentsのDialogコンポーネントを使用して実装できます。
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    確認
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tabs デモ
function TabsDemo() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Tabs デモ</h2>
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="flex border-b border-slate-700">
            {["tab1", "tab2", "tab3"].map((tab) => (
              <Button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                タブ {tab.slice(-1)}
              </Button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "tab1" && (
              <p className="text-gray-300">タブ1のコンテンツ</p>
            )}
            {activeTab === "tab2" && (
              <p className="text-gray-300">タブ2のコンテンツ</p>
            )}
            {activeTab === "tab3" && (
              <p className="text-gray-300">タブ3のコンテンツ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Select デモ
function SelectDemo() {
  const [value, setValue] = useState("option1");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Select デモ</h2>
        <div className="space-y-6">
          <div>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
              <option value="option3">オプション3</option>
            </select>
            <p className="text-sm text-gray-400 mt-2">
              選択値: <span className="text-cyan-400">{value}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Accordion デモ
function AccordionDemo() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["item1"]));

  const toggleItem = (item: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(item)) {
      newOpenItems.delete(item);
    } else {
      newOpenItems.add(item);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Accordion デモ</h2>
        <div className="space-y-2">
          {["item1", "item2", "item3"].map((item) => (
            <div key={item} className="bg-slate-800 rounded-lg overflow-hidden">
              <Button
                type="button"
                onClick={() =>
                  toggleItem(item)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <span className="text-white font-medium">
                  セクション {item.slice(-1)}
                </span>
                <span className="text-gray-400">
                  {openItems.has(item) ? "−" : "+"}
                </span>
              </Button>
              {openItems.has(item) && (
                <div className="p-6 text-gray-300">
                  これはセクション {item.slice(-1)} のコンテンツです。
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Alert Dialog デモ
function AlertDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Alert Dialog デモ
        </h2>
        <div className="space-y-6">
          <Button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            アラートを表示
          </Button>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-white mb-4">確認</h3>
                <p className="text-gray-300 mb-6">
                  この操作を実行してもよろしいですか？
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                  >
                    キャンセル
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    実行
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Menu デモ
function MenuDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Menu デモ</h2>
        <div className="space-y-6">
          <div className="relative">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              メニューを開く {selected && `- ${selected}`}
            </Button>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg min-w-[200px] z-10">
                  {["オプション1", "オプション2", "オプション3"].map(
                    (option) => (
                      <Button
                        type="button"
                        key={option}
                        onClick={() => {
                          setSelected(option);
                          setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </Button>
                    ),
                  )}
                </div>
              </>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              選択された値
            </h3>
            <p className="text-gray-400">
              {selected
                ? <span className="text-cyan-400">{selected}</span>
                : <span className="text-gray-500">なし</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

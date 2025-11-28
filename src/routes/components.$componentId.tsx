import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Box,
  Check,
  Code,
  Copy,
  ExternalLink,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "@base-ui-components/react/button";
import { Input } from "@base-ui-components/react/input";

export const Route = createFileRoute("/components/$componentId")({
  component: ComponentDetail,
});

const componentData: Record<
  string,
  {
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    examples: Array<{
      title: string;
      description: string;
      code: string;
      preview: React.ReactNode;
    }>;
    props?: Array<{ name: string; type: string; description: string }>;
  }
> = {
  button: {
    name: "Button",
    description:
      "Buttonコンポーネントは、ユーザーのアクションをトリガーするためのクリック可能な要素です。様々なサイズ、バリアント、状態をサポートしています。",
    category: "フォーム",
    icon: <Zap className="w-6 h-6" />,
    examples: [
      {
        title: "基本的な使い方",
        description: "シンプルなボタンの例",
        code: `import { Button } from '@base-ui-components/react/button'

<Button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
  クリック
</Button>`,
        preview: (
          <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            クリック
          </Button>
        ),
      },
      {
        title: "サイズバリエーション",
        description: "異なるサイズのボタン",
        code:
          `<Button className="px-2 py-1 text-sm bg-blue-600 text-white rounded">
  小
</Button>
<Button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
  中
</Button>
<Button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-xl">
  大
</Button>`,
        preview: (
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
        ),
      },
      {
        title: "バリアント",
        description: "異なるスタイルのボタン",
        code: `<Button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
  プライマリ
</Button>
<Button className="px-4 py-2 bg-gray-600 text-white rounded-lg">
  セカンダリ
</Button>
<Button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg">
  アウトライン
</Button>`,
        preview: (
          <div className="flex gap-4 items-center">
            <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              プライマリ
            </Button>
            <Button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
              セカンダリ
            </Button>
            <Button className="px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg">
              アウトライン
            </Button>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "className",
        type: "string",
        description: "カスタムCSSクラス",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "クリック時のハンドラ",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "無効化状態",
      },
    ],
  },
  input: {
    name: "Input",
    description:
      "Inputコンポーネントは、ユーザーからのテキスト入力を収集するためのフィールドです。バリデーションとエラーハンドリングをサポートしています。",
    category: "フォーム",
    icon: <Box className="w-6 h-6" />,
    examples: [
      {
        title: "基本的な使い方",
        description: "シンプルな入力フィールド",
        code: `import { Input } from '@base-ui-components/react/input'

<Input
  type="text"
  placeholder="名前を入力"
  className="px-4 py-2 border rounded-lg"
/>`,
        preview: (
          <Input
            type="text"
            placeholder="名前を入力"
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ),
      },
      {
        title: "サイズバリエーション",
        description: "異なるサイズの入力フィールド",
        code: `<Input className="px-2 py-1 text-sm border rounded" />
<Input className="px-4 py-2 border rounded-lg" />
<Input className="px-6 py-3 text-lg border rounded-xl" />`,
        preview: (
          <div className="flex flex-col gap-4">
            <Input
              className="px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="小"
            />
            <Input
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="中"
            />
            <Input
              className="px-6 py-3 text-lg border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="大"
            />
          </div>
        ),
      },
    ],
    props: [
      {
        name: "type",
        type: "string",
        description: "入力タイプ（text, email, password等）",
      },
      {
        name: "value",
        type: "string",
        description: "入力値",
      },
      {
        name: "onChange",
        type: "(e: ChangeEvent) => void",
        description: "値変更時のハンドラ",
      },
      {
        name: "placeholder",
        type: "string",
        description: "プレースホルダーテキスト",
      },
    ],
  },
};

function ComponentDetail() {
  const { componentId } = Route.useParams();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const component = componentData[componentId];

  if (!component) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            コンポーネントが見つかりません
          </h1>
          <Link to="/components" className="text-cyan-400 hover:text-cyan-300">
            コンポーネント一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = (code: string, exampleIndex: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(`${componentId}-${exampleIndex}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/components"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>コンポーネント一覧に戻る</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                {component.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {component.name}
                </h1>
                <p className="text-gray-400 mt-1">{component.category}</p>
              </div>
            </div>
            <Link
              to="/components/$componentId/demo"
              params={{ componentId }}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>デモを見る</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            {component.description}
          </p>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Play className="w-6 h-6 text-cyan-400" />例
          </h2>

          {component.examples.map((example, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-400 text-sm">{example.description}</p>
              </div>

              {/* Preview */}
              <div className="p-8 bg-slate-900/50 flex items-center justify-center min-h-[200px]">
                {example.preview}
              </div>

              {/* Code */}
              <div className="border-t border-slate-700">
                <div className="flex items-center justify-between p-4 bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-400">コード例</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => copyToClipboard(example.code, index)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                  >
                    {copiedCode === `${componentId}-${index}`
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
                <pre className="p-4 bg-slate-950 overflow-x-auto">
                  <code className="text-cyan-300 text-sm">{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Props Table */}
        {component.props && component.props.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-cyan-400" />
              Props
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      名前
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      型
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      説明
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {component.props.map((prop) => (
                    <tr key={prop.name} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4 text-white font-mono text-sm">
                        {prop.name}
                      </td>
                      <td className="px-6 py-4 text-cyan-400 font-mono text-sm">
                        {prop.type}
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

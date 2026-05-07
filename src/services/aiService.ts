/**
 * 模擬 AI 導師服務
 * 負責處理流式回應與學科背景邏輯
 */

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const MOCK_KNOWLEDGE_BASE = {
  physics: {
    name: '高級物理',
    topics: ['相對論', '量子力學', '熱力學'],
    responses: [
      "光速 $c$ 平方在 $E=mc^2$ 中不僅是單位換算，它揭示了能量與質量的極端轉化率。這意味著极小的質量損失就能釋放巨大的能量。",
      "根據狹義相對論，當物體接近光速時，時間會發生「膨脹」。這不是感官錯覺，而是實實在在的物理現象。",
    ]
  },
  math: {
    name: '高等數學',
    topics: ['微積分', '線性代數', '微分方程'],
    responses: [
      "特徵值 $\lambda$ 的物理意義通常代表系統在特定方向（特徵向量）上的縮放倍數。在結構力學中，這直接關聯到系統的穩態。",
      "分部積分法 $\int u dv = uv - \int v du$ 實際上是乘法求導法則的反向應用。它是處理乘積形式函數積分的利器。",
    ]
  }
};

/**
 * 模擬流式 AI 回應
 * @param content 使用者提問
 * @param onChunk 每次收到字元片段的回調
 */
export async function simulateStreamingResponse(
  content: string, 
  onChunk: (chunk: string) => void
): Promise<string> {
  // 根據內容關鍵字簡單模擬不同學科回覆
  let responseText = "這是一個非常深刻的問題。從學術角度來看，我們需要從基礎定義開始探討...";
  
  if (content.includes('光速') || content.includes('相對論')) {
    responseText = MOCK_KNOWLEDGE_BASE.physics.responses[0];
  } else if (content.includes('特徵值') || content.includes('矩陣')) {
    responseText = MOCK_KNOWLEDGE_BASE.math.responses[0];
  }

  // 模擬網路延遲與打字機效果
  const chunks = responseText.split('');
  let currentText = '';
  
  for (const char of chunks) {
    await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20)); // 打字機速度
    currentText += char;
    onChunk(currentText);
  }
  
  return currentText;
}

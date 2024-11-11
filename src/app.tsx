import React, { FC, useState } from 'react';
import { Text, useInput, Box, Key } from 'ink';

const App: FC = () => {
  const [pressedKey, setPressedKey] = useState<string>('None');
  const [keyDetails, setKeyDetails] = useState<string>('No key pressed yet');

  useInput((input: string, key: Key) => {
    // 特殊なキーの組み合わせを検出
    if ((key.ctrl || key.meta) && key.return) {
      setPressedKey(key.ctrl ? 'Ctrl+Enter' : 'Cmd+Enter');
    } else {
      // その他のすべてのキー入力を表示
      const modifiers = [
        key.ctrl && 'Ctrl',
        key.meta && 'Cmd',
        key.shift && 'Shift'
      ].filter(Boolean).join('+');

      const keyName = key.return ? 'Enter' : 
                     key.escape ? 'Escape' : 
                     key.tab ? 'Tab' : 
                     key.backspace ? 'Backspace' : 
                     key.delete ? 'Delete' : 
                     key.upArrow ? '↑' :
                     key.downArrow ? '↓' :
                     key.leftArrow ? '←' :
                     key.rightArrow ? '→' :
                     input;

      setPressedKey(modifiers ? `${modifiers}+${keyName}` : keyName);
    }
    
    // 常に詳細なキー情報を更新
    setKeyDetails(JSON.stringify({ input, key }, null, 2));
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text>Press any key to see the details</Text>
      <Text>Last pressed key: {pressedKey}</Text>
      <Text>Key details:</Text>
      <Text>{keyDetails}</Text>
    </Box>
  );
};

export default App;

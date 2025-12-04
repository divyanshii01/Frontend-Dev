import React, { useState } from 'react';

function ToggleCodeExample() {
  const [showCode, setShowCode] = useState(false);

  const handleToggle = () => {
    setShowCode(prev => !prev); // Toggle true/false
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>

      {showCode && (
        <pre>
          <code>
{`function hello() {
  console.log("Hello World");
}`}
          </code>
        </pre>
      )}
    </div>
  );
}

export default ToggleCodeExample;

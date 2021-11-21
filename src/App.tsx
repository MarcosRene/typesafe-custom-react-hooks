import { useEffect } from 'react';
import './global.css';
import { useNumber } from './hooks/01-useNumber';
import { useIsMounted } from './hooks/02-useIsMounted';
import { useToggle } from './hooks/03-useToggle';
import { useDebouncedValue } from './hooks/04-useDebouncedValue';

function App() {
  const [count, setCount] = useNumber(1);
  const isMounted = useIsMounted();
  const [active, setActive] = useToggle(false);
  const debouncedCount = useDebouncedValue(count);

  useEffect(() => {
    if (isMounted) {
      console.log(`assembled component`);
    }
  }, [isMounted]);

  useEffect(() => {
    console.log('Debaunced:', debouncedCount, 'Realtime:', count);
  }, [debouncedCount]);

  return (
    <div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>
        {count}
      </button>

      <button onClick={setActive}>Toggle</button>
      {active ? 'ENABLED' : 'DISABLED'}
    </div>
  );
}

export default App;

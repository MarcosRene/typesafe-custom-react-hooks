import { useEffect } from 'react';
import './global.css';
import { useNumber } from './hooks/01-useNumber';
import { useIsMounted } from './hooks/02-useIsMounted';
import { useToggle } from './hooks/03-useToggle';
import { useDebouncedValue } from './hooks/04-useDebouncedValue';
import { usePreviousValue } from './hooks/05-usePreviousValue';
import { useRecordState } from './hooks/06-useRecordState';
import { useAsyncEffect } from './hooks/07-useAsyncEffect';
import { useEventListener } from './hooks/08-useEventListener';

type Payload = {
  name: string;
  age?: number;
  state: string;
};

function App() {
  const [count, setCount] = useNumber(1);
  const isMounted = useIsMounted();
  const [active, setActive] = useToggle(false);
  const debouncedCount = useDebouncedValue(count);
  const previousCount = usePreviousValue(count);
  const [payload, setPayload] = useRecordState<Payload>({
    name: '',
    age: undefined,
    state: '',
  });

  useEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Enter') {
        console.log(`enter was pressed`);
      }
    },
    {
      target: window,
    }
  );

  useEffect(() => {
    if (isMounted) {
      console.log(`assembled component`);
    }
  }, [isMounted]);

  useEffect(() => {
    console.log('Debaunced:', debouncedCount, 'Realtime:', count);
  }, [debouncedCount]);

  console.log(`previousCount`, previousCount);

  console.log(`payload`, payload);

  useAsyncEffect(async () => {
    const codersClub = await new Promise((res) => res('codersClub'));
    console.log(`codersClub`, codersClub);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((prevState) => prevState + 1)}>
        {count}
      </button>

      <button onClick={setActive}>Toggle</button>
      {active ? 'ENABLED' : 'DISABLED'}

      <button
        onClick={() =>
          setPayload((prevState) => {
            return {
              ...prevState,
              name: 'Marcos',
              age: 24,
              state: 'CE',
            };
          })
        }
      >
        send
      </button>
    </div>
  );
}

export default App;

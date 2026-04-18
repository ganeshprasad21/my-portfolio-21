import React, { useState, useEffect, useRef } from 'react';

const commands = [
  {
    prompt: '[ganesh@g-mac21 ~]$ htop',
    lines: [
      { t: '  PID   USER     CPU%  MEM%  COMMAND', c: 'green' },
      { t: '   42   ganesh   4.2   5.8   k3s-server', c: 'dim' },
      { t: '   87   ganesh   2.1   4.4   prometheus', c: 'dim' },
      { t: '  103   ganesh   1.0   3.1   grafana', c: 'dim' },
      { t: '  311   ganesh   0.4   1.5   mcp-agent', c: 'dim' },
      { t: '  512   ganesh   0.2   1.0   fastapi-app', c: 'dim' },
    ],
  },
  {
    prompt: '[ganesh@g-mac21 ~]$ lsblk',
    lines: [
      { t: 'NAME    SIZE  TYPE  MOUNTPOINT', c: 'green' },
      { t: 'sda     500G  disk', c: 'dim' },
      { t: '├─sda1   99G  part  /boot', c: 'dim' },
      { t: '└─sda2  400G  part  /', c: 'dim' },
      { t: 'nvme0   1.8T  disk', c: 'dim' },
      { t: '└─nvme0n1 1.8T part /data', c: 'dim' },
    ],
  },
  {
    prompt: '[ganesh@g-mac21 ~]$ free -h',
    lines: [
      { t: '         total    used    free    buff/cache', c: 'green' },
      { t: 'Mem:      31Gi   14Gi    8.2Gi   8.8Gi', c: 'dim' },
      { t: 'Swap:      8Gi    0Bi    8.0Gi', c: 'dim' },
    ],
  },
  {
    prompt: '[ganesh@g-mac21 ~]$ kubectl get nodes',
    lines: [
      { t: 'NAME          STATUS   ROLES          AGE', c: 'green' },
      { t: 'master-01     Ready    control-plane  42d', c: 'dim' },
      { t: 'master-02     Ready    control-plane  42d', c: 'dim' },
      { t: 'worker-01     Ready    <none>         41d', c: 'dim' },
      { t: 'worker-02     Ready    <none>         41d', c: 'dim' },
    ],
  },
  {
    prompt: '[ganesh@g-mac21 ~]$ df -h',
    lines: [
      { t: 'Filesystem  Size   Used  Avail  Use%  Mount', c: 'green' },
      { t: '/dev/sda2   400G   120G   280G   30%  /', c: 'dim' },
      { t: '/dev/sda1    99G    12G    87G   12%  /boot', c: 'dim' },
      { t: 'tmpfs        16G   1.2G    15G    8%  /run', c: 'dim' },
    ],
  },
];

const DELAY = 120; // ms per line

const TerminalBoot = () => {
  const [lines, setLines] = useState([]);
  const cycleRef = useRef(0);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;

    const runCycle = async () => {
      while (!cancelRef.current) {
        const cmd = commands[cycleRef.current % commands.length];
        cycleRef.current++;

        const push = (line) => {
          if (!cancelRef.current)
            setLines((prev) => [...prev.slice(-40), line]); // keep last 40 lines
        };

        const delay = (ms) =>
          new Promise((res) => setTimeout(res, ms));

        push({ text: '', type: 'default' });
        push({ text: cmd.prompt, type: 'prompt' });
        await delay(DELAY);

        for (const l of cmd.lines) {
          push({ text: l.t, type: l.c });
          await delay(DELAY);
        }

        // Pause between commands
        await delay(1800);
      }
    };

    runCycle();
    return () => { cancelRef.current = true; };
  }, []);

  return (
    <div className="terminal-boot">
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={`boot-line ${
            line.type === 'green'  ? 'boot-output' :
            line.type === 'prompt' ? 'boot-prompt' :
            line.type === 'dim'    ? 'boot-dim'    : ''
          }`}
        >
          {line.text || '\u00A0'}
        </div>
      ))}
    </div>
  );
};

export default TerminalBoot;

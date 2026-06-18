import { Component, createEffect, createSignal, onMount, onCleanup } from 'solid-js';
import { Button, DataCard } from 'solid-web-components-ui';
import type { UserData } from 'solid-web-components-ui';
import 'solid-web-components-ui';

const SolidWrapper: Component = () => {
  const [log, setLog] = createSignal<string[]>([]);

  const [user] = createSignal<UserData>({
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    tags: ['管理员', '前端开发'],
    meta: { department: '技术部', level: 'P7' },
  });

  const actions = [
    { label: '查看详情', type: 'primary' as const },
    { label: '删除', type: 'secondary' as const },
  ];

  let btnEl: HTMLElement | undefined;
  let cardEl: HTMLElement | undefined;

  const handleBtnClick = (e: Event) => {
    const ce = e as CustomEvent;
    setLog((prev) => [...prev, `按钮被点击: ${ce.detail.originalEvent.type}`]);
  };

  const handleCardAction = (e: Event) => {
    const ce = e as CustomEvent;
    setLog((prev) => [
      ...prev,
      `卡片操作: ${ce.detail.type}, 用户: ${ce.detail.user?.name ?? '未知'}`,
    ]);
  };

  onMount(() => {
    btnEl?.addEventListener('ui-click', handleBtnClick);
    cardEl?.addEventListener('ui-action', handleCardAction);

    if (cardEl) {
      cardEl.user = user();
      cardEl.actions = actions;
    }
  });

  onCleanup(() => {
    btnEl?.removeEventListener('ui-click', handleBtnClick);
    cardEl?.removeEventListener('ui-action', handleCardAction);
  });

  createEffect(() => {
    if (cardEl) {
      cardEl.user = user();
    }
  });

  return (
    <div style={{ padding: '2rem', 'font-family': 'sans-serif' }}>
      <h2>Solid + Web Components</h2>

      <section style={{ margin: '0 0 2rem' }}>
        <h3>方式 1：直接使用 Solid 原生组件</h3>
        <Button
          variant="primary"
          size="medium"
          onClick={() => setLog((prev) => [...prev, 'Solid Button onClick 触发'])}
        >
          原生 Solid 按钮
        </Button>

        <div style={{ margin: '1rem 0' }}>
          <DataCard
            user={user()}
            theme="light"
            actions={actions}
            onAction={(p) =>
              setLog((prev) => [...prev, `原生 DataCard: ${p.type}, 用户: ${p.user?.name}`])
            }
          />
        </div>
      </section>

      <section style={{ margin: '0 0 2rem' }}>
        <h3>方式 2：使用 Web Component（跨框架通用）</h3>
        <ui-button ref={btnEl} variant="primary" size="medium">
          Web Component 按钮
        </ui-button>

        <div style={{ margin: '1rem 0' }}>
          <ui-data-card ref={cardEl} theme="light" />
        </div>
      </section>

      <section>
        <h3>事件日志</h3>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '1rem',
            'border-radius': '4px',
          }}
        >
          {log().length === 0 ? '（暂无事件）' : log().join('\n')}
        </pre>
      </section>
    </div>
  );
};

export default SolidWrapper;

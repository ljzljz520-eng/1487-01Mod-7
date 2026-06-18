import React, { useEffect, useRef, useState } from 'react';
import 'solid-web-components-ui';

const ReactWrapper = () => {
  const btnRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const userData = {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    tags: ['管理员', '前端开发'],
    meta: { department: '技术部', level: 'P7' },
  };

  const cardActions = [
    { label: '查看详情', type: 'primary' as const },
    { label: '删除', type: 'secondary' as const },
  ];

  useEffect(() => {
    const btn = btnRef.current;
    const card = cardRef.current;

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

    btn?.addEventListener('ui-click', handleBtnClick);
    card?.addEventListener('ui-action', handleCardAction);

    return () => {
      btn?.removeEventListener('ui-click', handleBtnClick);
      card?.removeEventListener('ui-action', handleCardAction);
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.user = userData;
      cardRef.current.actions = cardActions;
    }
  }, [userData, cardActions]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>React + Web Components</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>ui-button 组件</h3>
        <ui-button ref={btnRef} variant="primary" size="medium">
          点击我 (React)
        </ui-button>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>ui-data-card 组件（传复杂属性）</h3>
        <ui-data-card ref={cardRef} theme="light" />
      </section>

      <section>
        <h3>事件日志</h3>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
          {log.length === 0 ? '（暂无事件）' : log.join('\n')}
        </pre>
      </section>
    </div>
  );
};

export default ReactWrapper;

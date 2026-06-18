<template>
  <div class="wrapper">
    <h2>Vue + Web Components</h2>

    <section>
      <h3>ui-button 组件</h3>
      <ui-button ref="btnRef" variant="primary" size="medium" @ui-click="onBtnClick">
        点击我 (Vue)
      </ui-button>
    </section>

    <section>
      <h3>ui-data-card 组件（传复杂属性）</h3>
      <ui-data-card ref="cardRef" :theme="theme" @ui-action="onCardAction" />
    </section>

    <section>
      <h3>事件日志</h3>
      <pre class="log">{{ log.length ? log.join('\n') : '（暂无事件）' }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import 'solid-web-components-ui';

const btnRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const log = ref<string[]>([]);
const theme = ref<'light' | 'dark'>('light');

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

const onBtnClick = (e: Event) => {
  const ce = e as CustomEvent;
  log.value.push(`按钮被点击: ${ce.detail.originalEvent.type}`);
};

const onCardAction = (e: Event) => {
  const ce = e as CustomEvent;
  log.value.push(`卡片操作: ${ce.detail.type}, 用户: ${ce.detail.user?.name ?? '未知'}`);
};

onMounted(() => {
  if (cardRef.value) {
    cardRef.value.user = userData;
    cardRef.value.actions = cardActions;
  }
});

watch([theme], () => {
  // 响应式属性通过 DOM property 同步
});
</script>

<style scoped>
.wrapper {
  padding: 2rem;
  font-family: sans-serif;
}
section {
  margin-bottom: 2rem;
}
.log {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}
</style>

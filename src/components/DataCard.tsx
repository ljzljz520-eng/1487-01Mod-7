import { Component, JSX, splitProps, For } from 'solid-js';
import { customElement } from 'solid-element';
import type { ComponentOptions } from 'component-register';

export interface UserData {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  tags?: string[];
  meta?: Record<string, unknown>;
}

export interface DataCardProps {
  user?: UserData | null;
  theme?: 'light' | 'dark';
  actions?: { label: string; type: 'primary' | 'secondary' }[];
  children?: JSX.Element;
  onAction?: (action: { type: string; user?: UserData }) => void; // eslint-disable-line no-unused-vars
  [key: string]: any;
}

export const DataCard: Component<DataCardProps> = (props) => {
  const [local] = splitProps(props, ['user', 'theme', 'actions', 'onAction']);

  const theme = local.theme || 'light';
  const user = local.user;
  const actions = local.actions || [];

  const themeStyles = () => {
    if (theme === 'dark') {
      return 'bg-gray-800 text-white border-gray-700';
    }
    return 'bg-white text-gray-900 border-gray-200';
  };

  const actionBtnStyles = (type: 'primary' | 'secondary') => {
    return type === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };

  return (
    <div
      class={`p-5 rounded-lg border shadow-sm ${themeStyles()}`}
    >
      {user ? (
        <>
          <div class="flex items-center gap-3 mb-4">
            {user.avatar && (
              <img src={user.avatar} alt={user.name} class="w-12 h-12 rounded-full object-cover" />
            )}
            <div>
              <h3 class="font-semibold text-lg">{user.name}</h3>
              <p class="text-sm opacity-70">{user.email}</p>
            </div>
          </div>

          {user.tags && user.tags.length > 0 && (
            <div class="flex flex-wrap gap-2 mb-4">
              <For each={user.tags}>
                {(tag) => (
                  <span class="px-2 py-1 text-xs rounded-full bg-opacity-20 bg-blue-500 text-blue-700">
                    {tag}
                  </span>
                )}
              </For>
            </div>
          )}

          {user.meta && Object.keys(user.meta).length > 0 && (
            <div class="text-xs mb-4 p-3 rounded bg-opacity-10 bg-gray-500">
              <For each={Object.entries(user.meta)}>
                {([k, v]) => (
                  <div class="mb-1">
                    <span class="font-medium">{k}:</span> {String(v)}
                  </div>
                )}
              </For>
            </div>
          )}
        </>
      ) : (
        <p class="text-center opacity-60 py-4">暂无用户数据</p>
      )}

      {actions.length > 0 && (
        <div class="flex gap-2 mt-4">
          <For each={actions}>
            {(action) => (
              <button
                class={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${actionBtnStyles(action.type)}`}
                onClick={() => local.onAction?.({ type: action.label, user: user ?? undefined })}
              >
                {action.label}
              </button>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

customElement(
  'ui-data-card',
  {
    user: null,
    theme: 'light',
    actions: [],
  },
  (props: DataCardProps, { element }: ComponentOptions) => {
    const handleAction = (payload: { type: string; user?: UserData }) => {
      (element as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('ui-action', {
          bubbles: true,
          composed: true,
          detail: payload,
        })
      );
    };

    return (
      <DataCard
        user={props.user as UserData | null | undefined}
        theme={props.theme as 'light' | 'dark'}
        actions={props.actions as { label: string; type: 'primary' | 'secondary' }[]}
        onAction={handleAction}
      >
        <slot />
      </DataCard>
    );
  }
);

export default DataCard;

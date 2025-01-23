import { toast } from 'vue3-toastify'

export const openPageInNewTab = function (routePath) {
  const baseUrl = import.meta.env.BASE_URL;
  const fullUrl = `${window.location.origin}${baseUrl}#${routePath}`;
  window.open(fullUrl, '_blank');
};

export const copyPageLink = function (routePath) {
  const baseUrl = import.meta.env.BASE_URL;
  const fullUrl = `${window.location.origin}${baseUrl}#${routePath}`;
  navigator.clipboard
    .writeText(fullUrl)
    .then(() => {
      toast.success(`Ссылка на ${routePath} скопирована!`);
    })
    .catch(() => {
      toast.error(`Не удалось скопировать ссылку на ${routePath}.`);
    });
};

export const socialIcons = [
  {
    id: 'external',
    route: '/artwork',
    action: openPageInNewTab,
  },
  {
    id: 'share',
    route: '/artwork',
    action: copyPageLink,
  },
  {
    id: 'vertical-more',
    route: '',
    action: function(){
      toast.info('Decoration')
    },
  },
]

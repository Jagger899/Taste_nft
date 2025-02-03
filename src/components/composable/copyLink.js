import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export function openPageInNewTab(url) {
  window.open(url, '_blank')
}

const routeMap = {
  promo: '/artwork',
  usersActivity: '/creator',
}

export function copyPageLink(currentPage) {
  const currentUrl = window.location.origin + routeMap[currentPage] || window.location.href
  navigator.clipboard.writeText(currentUrl).then(() => {
    toast.success('Ссылка скопирована!', {
      position: 'top-right',
      autoClose: 2000
    })
  })
}



export function getTargetRoute(currentPage) {
  return routeMap[currentPage] || '/'
}

export const socialIcons = [
  {
    id: 'external',
    route: 'dynamic',
    action: openPageInNewTab,
  },
  {
    id: 'share',
    route: 'copy',
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

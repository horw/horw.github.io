interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Linki',
    description: 'Make language learning engaging and effective',
    imgSrc: '/static/images/linki.svg',
    href: '',
  },
  {
    title: 'Selit',
    description: 'Selit (Select it!) is a smart clipboard enhancement tool that monitors your clipboard and applies customized AI prompts based on the active window.',
    imgSrc: 'https://github.com/horw/selit/raw/main/resources/logo.png',
    href: 'https://github.com/horw/selit'
  }
]

export default projectsData

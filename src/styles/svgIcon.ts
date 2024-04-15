import type { ButtonIcon } from '../commons/styles/ComponentsType'
import commonsSVG from '../commons/styles/svgIcon'

const NavContents = (color?: string): string => {
  color = color?.indexOf('#') === -1 ? color : color?.substring(1, color.length)
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180' fill='none'%3E%3Cg clip-path='url(%23clip0_684_12531)'%3E%3Cpath d='M152.8 26.22C117.85 -8.74 61.17 -8.74 26.22 26.22C-8.74 61.18 -8.74 117.85 26.22 152.81C61.18 187.77 117.85 187.77 152.81 152.81C187.77 117.85 187.77 61.18 152.81 26.22H152.8ZM72.43 123.35L67.99 127.79C67.68 128.1 67.28 128.3 66.85 128.36L48.19 130.99L50.67 112.19C50.73 111.75 50.93 111.35 51.24 111.03L55.67 106.6C56.45 105.82 57.72 105.82 58.51 106.6L72.43 120.52C73.21 121.3 73.21 122.57 72.43 123.36V123.35ZM80.96 114.82L64.21 98.07L105.86 56.42L122.61 73.17L80.96 114.82ZM137.87 57.91L129.33 66.45L112.58 49.7L121.12 41.16C121.9 40.38 123.17 40.38 123.95 41.16L137.88 55.09C138.66 55.87 138.66 57.14 137.88 57.92L137.87 57.91Z' fill='%23${color}'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_684_12531'%3E%3Crect width='179.02' height='179.02' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"`
}

const NavCategory = (color?: string): string => {
  color = color?.indexOf('#') === -1 ? color : color?.substring(1, color.length)
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='182' height='180' viewBox='0 0 182 180' fill='none'%3E%3Cg clip-path='url(%23clip0_684_12483)'%3E%3Cpath d='M177.149 0H79.1094C76.9002 0 75.1094 1.79086 75.1094 4V80.41C75.1094 82.6191 76.9002 84.41 79.1094 84.41H177.149C179.359 84.41 181.149 82.6191 181.149 80.41V4C181.149 1.79086 179.359 0 177.149 0Z' fill='%23${color}'/%3E%3Cpath d='M62.97 0H4C1.79086 0 0 1.79086 0 4V80.41C0 82.6191 1.79086 84.41 4 84.41H62.97C65.1791 84.41 66.97 82.6191 66.97 80.41V4C66.97 1.79086 65.1791 0 62.97 0Z' fill='%23${color}'/%3E%3Cpath d='M102.52 95.2998H4C1.79086 95.2998 0 97.0907 0 99.2998V175.71C0 177.919 1.79086 179.71 4 179.71H102.52C104.729 179.71 106.52 177.919 106.52 175.71V99.2998C106.52 97.0907 104.729 95.2998 102.52 95.2998Z' fill='%23${color}'/%3E%3Cpath d='M177.14 95.2998H118.42C116.211 95.2998 114.42 97.0907 114.42 99.2998V175.71C114.42 177.919 116.211 179.71 118.42 179.71H177.14C179.349 179.71 181.14 177.919 181.14 175.71V99.2998C181.14 97.0907 179.349 95.2998 177.14 95.2998Z' fill='%23${color}'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_684_12483'%3E%3Crect width='181.15' height='179.71' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"`
}

const Insight = (color?: string): string => {
  color = color?.indexOf('#') === -1 ? color : color?.substring(1, color.length)
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='178' height='177' viewBox='0 0 178 177' fill='none'%3E%3Cg clip-path='url(%23clip0_684_12466)'%3E%3Cpath d='M175.66 172.78H168.72V59.66C168.72 58.56 167.83 57.66 166.72 57.66H142.59C141.49 57.66 140.59 58.55 140.59 59.66V172.77H126.81V107.57C126.81 106.47 125.92 105.57 124.81 105.57H100.68C99.58 105.57 98.68 106.46 98.68 107.57V172.77H84.9V83.61C84.9 82.51 84.01 81.61 82.9 81.61H58.77C57.67 81.61 56.77 82.5 56.77 83.61V172.77H42.84V125.87C42.84 124.77 41.95 123.87 40.84 123.87H16.71C15.61 123.87 14.71 124.76 14.71 125.87V172.77H3.73V1.86C3.73 0.83 2.9 0 1.87 0C0.84 0 0 0.83 0 1.86V176.5H175.66C176.69 176.5 177.52 175.67 177.52 174.64C177.52 173.61 176.69 172.78 175.66 172.78Z' fill='%23${color}'/%3E%3Cpath d='M28.7795 102.13C35.0395 102.13 40.1195 97.0498 40.1195 90.7898C40.1195 88.3798 39.3595 86.1398 38.0695 84.2998L64.2394 58.1298C66.0994 59.4598 68.3695 60.2498 70.8295 60.2498C74.6995 60.2498 78.1095 58.3098 80.1595 55.3498L102.539 71.5698C101.819 73.0598 101.409 74.7198 101.409 76.4898C101.409 82.7498 106.489 87.8298 112.749 87.8298C119.009 87.8298 124.089 82.7498 124.089 76.4898C124.089 74.0798 123.329 71.8498 122.049 70.0198L151.229 32.6998C152.309 33.0398 153.459 33.2298 154.659 33.2298C160.919 33.2298 165.999 28.1498 165.999 21.8898C165.999 15.6298 160.919 10.5498 154.659 10.5498C148.399 10.5498 143.319 15.6298 143.319 21.8898C143.319 25.2598 144.799 28.2798 147.129 30.3598L118.619 66.8198C116.899 65.7798 114.899 65.1598 112.739 65.1598C109.929 65.1598 107.369 66.1898 105.389 67.8798L81.9795 50.9198C82.0995 50.2698 82.1694 49.5998 82.1694 48.9198C82.1694 42.6598 77.0895 37.5798 70.8295 37.5798C64.5695 37.5798 59.4895 42.6598 59.4895 48.9198C59.4895 51.0298 60.0795 52.9998 61.0795 54.6898L34.6595 81.1098C32.9395 80.0698 30.9395 79.4498 28.7795 79.4498C22.5195 79.4498 17.4395 84.5298 17.4395 90.7898C17.4395 97.0498 22.5195 102.13 28.7795 102.13Z' fill='%23${color}'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_684_12466'%3E%3Crect width='177.53' height='176.5' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"`
}

const CurrentSVG: { [key: ButtonIcon | string]: (color?: string) => string } = {
  ...commonsSVG,
  NavContents,
  NavCategory,
  Insight,
}

export default CurrentSVG
import { CommunityDriven } from './components/CommunityDriven'
import { CommunityNFT } from './components/CommunityNFT'
import { Faqs } from './components/Faq'
import { Features } from './components/Feature'
import { Hero } from './components/Hero'
import { Nft } from './components/Nft'
import { Secured } from './components/Secured'

export default function Home() {
  return (
    <main>
      <Hero/>
      <Features />
      <Nft />
      <CommunityNFT />
      <CommunityDriven />
      <Secured />
      <Faqs />
    </main>
  )
}

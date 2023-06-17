import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
    <iframe
    src="https://ipfs-2.thirdwebcdn.com/ipfs/QmZG9dPDYCpTuzM3mVvdtmpjqwCbhErPipNvT945QqzWHk?contract=0xc336ECddB1DdB113123e6535a8d3957aa829eeb8&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%7D&primaryColor=purple"
    width="600px"
    height="600px"
    frameborder="0"
    ></iframe>
    </main>
  )
}

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Web3 from 'web3';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Graph', href: 'graph', current: false },
]


  var connected = false

 function Header() {
  //connect to wallet
  async function connect() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    try{
      if (accounts.length > 0){
        console.log('You are already connected to wallet')
        alert('Your are connected')
      }
      else{
        console.log('You are Not connected to wallet')
        alert('Plese connect to metamask ')
      }
    } catch (error) {
      alert('something went wrong with wallet or intenet connection')
      console.log(accounts)
      console.log(error)
    }
  }
 



  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-9xl px-6 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <p className="text-white font-extrabold text-4xl">
                  coinDapp
                </p>
                <div className="flex items-center">
                  <img
                    alt="coinDapp-image"
                    src="/coinApp-logo.png"
                    className="h-20 w-20"
                  />
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              

              <button onClick={connect} className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 pb-3 pt-2 sm:px-3 border-2 border-gray-300 rounded-lg shadow-lg">
                Connect
              </button>
            </div>
           </div>
        </Disclosure>

        
      </div>
    </>
  );
}


export default Header;
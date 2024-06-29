import { CoffeeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import fraxtalLogo from '@/public/BuiltOnFraxtal2.png';

const Footer = () => {
	return (
		<footer className="border-t flex items-center justify-between px-10 py-4">
			<div className="flex items-center">
				<CoffeeIcon className="h-4 w-4 mr-2 text-rose-500" />
				<span className="text-xs text-neutral-500">
					Designed and developed by{' '}
					<Link href="https://github.com/almoloo">Ali Mousavi</Link>
				</span>
			</div>
			<div>
				<Link href="https://frax.com">
					<Image
						src={fraxtalLogo}
						alt="Fraxtal"
						className="h-8 w-auto"
					/>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;

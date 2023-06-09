import { Dribbble, Facebook, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap text-left lg:text-left">
					<div className="w-full lg:w-6/12 px-4">
						<h4 className="text-3xl fonat-semibold text-gray-700">Let's keep in touch!</h4>
						<h5 className="text-lg mt-0 mb-2 text-gray-600">
							Find us on any of these platforms, we respond 1-2 business days.
						</h5>
						<div className="mt-6 lg:mb-0 mb-6">
							<div className="text-blue-400 font-normal flex items-center justify-start align-center gap-2">
								<Twitter className="text-blue-400 footer_social_icon" />
								<Facebook className="text-blue-600 footer_social_icon" />
								<Dribbble className="text-pink-400 footer_social_icon" />
								<Github className="text-gray-800 footer_social_icon" />
							</div>
						</div>
					</div>
					<div className="w-full lg:w-6/12 px-4">
						<div className="flex flex-wrap items-top mb-6">
							<div className="w-full lg:w-4/12 ml-auto">
								<span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Useful Links</span>
								<ul className="list-unstyled">
									<li>
										<Link href="/" className="footer_link" >About Us</Link>
									</li>
									<li>
										<Link href="/" className="footer_link">Blog</Link>
									</li>
									<li>
										<Link href="/" className="footer_link">Github</Link>
									</li>
								</ul>
							</div>
							<div className="w-full lg:w-4/12">
								<span className="block uppercase text-gray-500 text-sm font-semibold mb-2">Other Resources</span>
								<ul className="list-unstyled">
									<li>
										<Link href="/" className="footer_link">Terms &amp; Conditions</Link>
									</li>
									<li>
										<Link href="/" className="footer_link">Privacy Policy</Link>
									</li>
									<li>
										<Link href="/" className="footer_link">Contact Us</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<hr className="my-6 border-gray-300"></hr>
				<div className="flex flex-wrap items-center md:justify-between justify-center">
					<div className="w-full md:w-4/12 px-4 mx-auto text-center">
						<div className="text-sm text-gray-500 font-semibold py-1">
							Copyright &copy; 2023 AIInspire by
							<span className="text-purple-800 hover:text-purple-950"> Letícia Borchardt</span>.
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
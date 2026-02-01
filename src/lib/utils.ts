type BrowserNames = 'edge' | 'chrome' | 'firefox';

export function getBrowserName(ua: string | undefined): BrowserNames | undefined {
	if (!ua) return;

	const uaLower = ua.toLowerCase();
	if (uaLower.includes('edg')) return 'edge';
	if (uaLower.includes('chrome')) return 'chrome';
	if (uaLower.includes('firefox')) return 'firefox';
}

export const storeURLS: Record<BrowserNames, string> = {
	chrome: 'https://chromewebstore.google.com/detail/quick-reply-meet/dodpcgfhomjldnenagdibjcoofheocfc',
	firefox: 'https://addons.mozilla.org/firefox/addon/quick-reply-meet/',
	edge: 'https://microsoftedge.microsoft.com/addons/detail/quick-reply-meet/lonfbmmkmojfammfcljbnelobfnhpigk'
};

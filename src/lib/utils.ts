export function getBrowserName(ua: string | undefined) {
	if (!ua) return;

	const uaLower = ua.toLowerCase();
	if (uaLower.includes('edg')) return 'edge';
	if (uaLower.includes('chrome')) return 'chrome';
	if (uaLower.includes('firefox')) return 'firefox';
}

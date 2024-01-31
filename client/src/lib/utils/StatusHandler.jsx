export function getOrderStatus(status) {
	switch (status) {
		case 'PLACED':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'CONFIRMED':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'SHIPPED':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'OUT_FOR_DELIVERY':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'DELIVERED':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		default:
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
	}
}
export function getBadge(status) {
	switch (status) {
		case 'Gold':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs font-bold text-orange-400 bg-orange-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'Silver':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs font-bold text-gray-400 bg-gray-200">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		case 'Bronze':
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs font-bold text-orange-700 bg-orange-200">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
		
		default:
			return (
				`<span class="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
				${status.replaceAll('_', ' ').toLowerCase()}
			  </span>`
			)
	}
}
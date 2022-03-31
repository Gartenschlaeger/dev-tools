import { Component, Input, OnInit } from '@angular/core'
import { IconSize, IconType } from 'src/app/modules/svg-icons/svg-icons.module'

class IconData {
	SvgViewBoxSize: string | null = null
	SvgFillMode: 'none' | 'currentColor' | null = null
	SvgStroke: 'currentColor' | null = null
	SvgStrokeWidth: number | null = null
	PathData?: string
	PathStrokeLineCap: 'round' | null = null
	PathStrokeLineJoin: 'round' | null = null
	PathFillRule: 'evenodd' | null = null
	PathClipRule: 'evenodd' | null = null
}

@Component({
	selector: 'app-svg-icon',
	templateUrl: './svg-icon.component.html'
})
export class SvgIconComponent implements OnInit {
	@Input() size: IconSize = 'sm'
	@Input() type: IconType = 'plus'

	data!: IconData

	ngOnInit() {
		this.data = this.selectDataByType()
	}

	selectDataByType(): IconData {
		let result = new IconData()

		switch (this.type) {
			case 'plus':
				result.SvgViewBoxSize = '0 0 24 24'
				result.SvgStroke = 'currentColor'
				result.SvgStrokeWidth = 2
				result.SvgFillMode = 'currentColor'
				result.PathData = 'M12 6v6m0 0v6m0-6h6m-6 0H6'
				break

			case 'minus':
				result.SvgViewBoxSize = '0 0 24 24'
				result.SvgStroke = 'currentColor'
				result.SvgStrokeWidth = 2
				result.PathData = 'M18 12H6'
				result.PathStrokeLineCap = 'round'
				result.PathStrokeLineJoin = 'round'
				break

			case 'delete':
				result.SvgViewBoxSize = '0 0 24 24'
				result.SvgFillMode = 'none'
				result.SvgStroke = 'currentColor'
				result.SvgStrokeWidth = 2
				result.PathData =
					'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
				result.PathStrokeLineCap = 'round'
				result.PathStrokeLineJoin = 'round'
				break

			case 'refresh':
				result.SvgViewBoxSize = '0 0 20 20'
				result.SvgFillMode = 'currentColor'
				result.PathFillRule = 'evenodd'
				result.PathClipRule = 'evenodd'
				result.PathData =
					'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
				break

			case 'hearth':
				result.SvgViewBoxSize = '0 0 20 20'
				result.SvgStroke = 'currentColor'
				result.SvgStrokeWidth = 2
				result.SvgFillMode = 'currentColor'
				result.PathFillRule = 'evenodd'
				result.PathClipRule = 'evenodd'
				result.PathData =
					'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
				break

			case 'arrowRight':
				result.SvgViewBoxSize = '0 0 24 24'
				result.SvgFillMode = 'none'
				result.SvgStroke = 'currentColor'
				result.SvgStrokeWidth = 2
				result.PathData = 'M9 5l7 7-7 7'
				result.PathStrokeLineCap = 'round'
				result.PathStrokeLineJoin = 'round'
				break

			case 'arrowDown':
				result.SvgViewBoxSize = '0 0 20 20'
				result.SvgFillMode = 'currentColor'
				result.SvgStrokeWidth = null
				result.PathData =
					'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
				result.PathFillRule = 'evenodd'
				result.PathClipRule = 'evenodd'
				break

			case 'exclamation':
				result.SvgViewBoxSize = '0 0 20 20'
				result.SvgFillMode = 'currentColor'
				result.SvgStrokeWidth = null
				result.PathData =
					'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
				result.PathFillRule = 'evenodd'
				result.PathClipRule = 'evenodd'
				break
		}

		return result
	}
}

FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop
)

FilePond.setOptions({
    labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150,
    stylePanelLayout: 'compact circle',
    stylePanelAspectRatio: 150 / 100,
    imageCropAspectRatio: '1:1',
    styleLoadIndicatorPosition: 'center top',
    styleProgressIndicatorPosition: 'right bottom',
    styleButtonRemoveItemPosition: 'center bottom',
    styleButtonProcessItemPosition: 'right bottom',
})

FilePond.parse(document.body)
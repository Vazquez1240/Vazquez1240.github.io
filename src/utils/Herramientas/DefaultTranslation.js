export const DefaultTranslation = Object.freeze({
  lang: {
    text: 'Spanish',
    code: 'es-es',
    info: 'Esta es la traducción default al español',
  },
  commons: {
    titles: {
      edit: 'Editar',
      delete: 'Eliminar',
      dragToSort: 'Arrastrar para ordenar',
      download: 'Descargar',
      copyText: 'Copiar texto',
      copyCoordinates: 'Copiar coordenadas',
      showLayer: 'Mostrar capa',
      rename: 'Renombrar',
      toggleSection: 'Alternar sección',
      toggleVisibility: 'Alternar visibilidad',
      zoomToCoordinates: 'Zoom a coordenadas',
    },
  },
  managers: {
    settingsManager: {
      settings: {
        mouseWheelZoom: 'Zoom del mapa solo con rueda del ratón',
        altShiftDragRotate: 'Rotar el mapa con Shift + Alt + Arrastrar',
        dragPan: 'Arrastrar el mapa solo con el ratón',
        keyboardZoom: 'Zoom del mapa con el teclado',
        keyboardPan: 'Mover el mapa con el teclado',
        selectVectorMapShapes: 'Seleccionar formas en capas de mapa vectorial',
        snapInteraction: 'Usar interacción de ajuste',
        snapHelpLines: 'Usar líneas de ayuda de ajuste',
        alwaysNewLayers: 'Crear nueva capa al seleccionar herramienta',
      },
    },
    errorManager: {
      toasts: {
        errors: {
          uncaughtException: {
            title: 'Error',
            message: 'Se produjo un error inesperado',
          },
        },
      },
    },
    infoWindowManager: {
      toasts: {
        infos: {
          copyMarkerCoordinates: {
            title: 'Copiado',
            message: 'Coordenadas del marcador copiadas al portapapeles',
          },
          copyMarkerInfo: {
            title: 'Copiado',
            message: 'Información del marcador copiada al portapapeles',
          },
        },
        errors: {
          copyMarkerInfo: {
            title: 'Error',
            message: 'Error al copiar la información del marcador',
          },
          copyMarkerCoordinates: {
            title: 'Error',
            message: 'Error al copiar las coordenadas del marcador',
          },
        },
      },
      dialogs: {
        confirms: {
          deleteMarker: {
            title: 'Eliminar marcador',
            message: '¿Desea eliminar este marcador?',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
          },
        },
      },
    },
  },
  modalExtensions: {
    coordinateModal: {
      title: 'Coordenadas',
      form: {
        latitude: 'Latitud',
        longitude: 'Longitud',
        navigateTo: 'Navegar a',
        cancel: 'Cancelar',
        description: 'Las coordenadas se proporcionan en WGS84 / EPSG:4326',
      },
    },
    debugInfoModal: {
      title: 'Información de depuración',
      noMapFound: 'No se encontró referencia de mapa',
      form: {
        doAction: 'Realizar acción',
        defaultItem: {
          title: 'Seleccionar acción',
        },
        miscGroup: {
          title: 'Misceláneo',
          items: {
            logToBrowser: 'Registrar mapa en la consola del navegador',
            generateUUID: 'Generar UUID',
            clearStyleManager: 'Borrar el administrador de estilos',
          },
        },
        eventLogGroup: {
          title: 'Registro de eventos',
          items: {
            copyEventLog: 'Copiar registro de eventos',
            clearEventLog: 'Borrar registro de eventos',
          },
        },
      },
      sections: {
        appData: 'Datos de la aplicación',
        mapData: 'Datos del mapa',
        browserData: 'Datos del navegador',
        localStorage: 'Almacenamiento local',
        sessionStorage: 'Almacenamiento de sesión',
        cookies: 'Cookies',
        eventLog: 'Registro de eventos',
      },
      toasts: {
        infos: {
          logMapObject: {
            title: 'Registrado',
            message: 'Objeto de mapa registrado en la consola',
          },
          copyEventLog: {
            title: 'Copiado',
            message: 'Registro de eventos copiado al portapapeles',
          },
          clearEventLog: {
            title: 'Borrado',
            message: 'Se borraron todas las entradas del registro de eventos',
          },
          clearStyleManager: {
            title: 'Borrado',
            message:
              'Se borraron todas las entradas del administrador de estilos',
          },
        },
        errors: {
          copyEventLog: {
            title: 'Error',
            message: 'Error al copiar el registro de eventos al portapapeles',
          },
        },
      },
    },
    downloadLayerModal: {
      title: 'Descargar capa',
      form: {
        layerFormat: 'Formato de capa',
        download: 'Descargar capa',
        cancel: 'Cancelar',
      },
    },
    geometryDataModal: {
      title: 'Datos de geometría',
      data: {
        id: 'ID',
        measurement: 'Medición',
        oltbProperties: 'Propiedades de OLTB',
        vertices: 'Vértices',
        coordinates: 'Coordenadas',
      },
    },
    iconMarkerModal: {
      title: 'Configuración de marcador',
      form: {
        title: 'Título',
        description: 'Descripción',
        latitude: 'Latitud',
        longitude: 'Longitud',
        markerFill: 'Relleno de marcador',
        markerStroke: 'Contorno de marcador',
        icon: 'Ícono',
        iconFill: 'Relleno de ícono',
        iconStroke: 'Contorno de ícono',
        label: 'Etiqueta',
        labelFill: 'Relleno de etiqueta',
        labelStroke: 'Contorno de etiqueta',
        labelStrokeWidth: 'Ancho del contorno de etiqueta',
        saveChanges: 'Guardar cambios',
        createMarker: 'Crear marcador',
        cancel: 'Cancelar',
      },
    },
    importLayerModal: {
      title: 'Importar capa',
      form: {
        featureProjection: 'Proyección de características',
        dataProjection: 'Proyección de datos',
        import: 'Importar capa',
        cancel: 'Cancelar',
      },
    },
    layerModal: {
      title: 'Crear capa de mapa',
      form: {
        name: 'Nombre',
        layer: 'Capa',
        source: 'Fuente',
        projection: 'Proyección',
        url: 'URL',
        parameters: 'Parámetros (JSON)',
        wrapX: 'WrapX',
        cors: 'CORS',
        attributions: 'Atribuciones',
        createLayer: 'Crear capa',
        cancel: 'Cancelar',
      },
    },
    settingsModal: {
      title: 'Configuración',
      form: {
        save: 'Guardar Configuración',
        cancel: 'Cancelar',
      },
    },
  },
  tools: {
    hiddenAboutTool: {
      contextItems: {
        about: 'Acerca de OLTB',
      },
      modals: {
        about: {
          title: 'Acerca de OLTB',
          version: 'Versión',
          developedBy: 'Desarrollado por Qulle',
          usingOpenLayers: 'Usando OpenLayers',
        },
      },
    },
    hiddenMapNavigationTool: {
      contextItems: {
        copyCoordinates: 'Copiar Coordenadas',
        navigateToCoordinates: 'Navegar a',
        centerMap: 'Centrar Aquí',
        focusMap: 'Enfocar Aquí',
      },
      toasts: {
        infos: {
          coordinatesCopied: {
            title: 'Copiado',
            message: 'Coordenadas copiadas al portapapeles',
          },
        },
        errors: {
          coordinatesCopy: {
            title: 'Error',
            message: 'Error al copiar las coordenadas',
          },
          parseUrlMarker: {
            title: 'Error',
            message: 'Error al analizar el marcador URL',
          },
          missingProjection: {
            title: 'Error',
            message: 'Definición de proyección faltante',
          },
        },
      },
    },
    hiddenMarkerTool: {
      contextItems: {
        createMarker: 'Crear Marcador',
      },
    },
    bookmarkTool: {
      title: 'Marcadores',
      toolbox: {
        titles: {
          bookmarks: 'Marcadores',
        },
        groups: {
          addBookmark: {
            placeholder: 'Nombre',
            add: 'Agregar Marcador',
          },
        },
      },
      contextItems: {
        addBookmark: 'Agregar Marcador',
        clearBookmarks: 'Limpiar Marcadores',
      },
      layers: {
        bookmarks: 'Marcadores',
      },
      toasts: {
        infos: {
          clearBookmarks: {
            title: 'Limpiado',
            message: 'Se borraron todos los marcadores almacenados',
          },
          createBookmark: {
            title: 'Nuevo Marcador',
            message: 'Se creó un nuevo marcador',
          },
          copyCoordinates: {
            title: 'Copiado',
            message: 'Coordenadas copiadas al portapapeles',
          },
        },
        errors: {
          copyCoordinates: {
            title: 'Error',
            message: 'Error al copiar las coordenadas',
          },
        },
      },
      dialogs: {
        confirms: {
          clearBookmarks: {
            title: 'Limpiar Marcadores',
            message: '¿Quieres borrar todos los marcadores?',
            confirmText: 'Limpiar',
            cancelText: 'Cancelar',
          },
          deleteBookmark: {
            title: 'Eliminar Marcador',
            message: '¿Quieres eliminar el marcador?',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
          },
        },
        prompts: {
          editBookmark: {
            title: 'Editar Nombre',
            message: 'Estás editando el marcador',
            confirmText: 'Renombrar',
            cancelText: 'Cancelar',
          },
        },
      },
    },
    coordinatesTool: {
      title: 'Mostrar Coordenadas',
      toolbox: {
        titles: {
          coordinates: 'Coordenadas',
        },
        groups: {
          formats: {
            title: 'Formato',
            dd: 'Grados Decimales',
            dms: 'Grados, Minutos, Segundos',
          },
          coordinates: {
            title: 'Coordenadas',
          },
        },
      },
      settings: {
        copyOnClick: 'Copiar Coordenadas Al Clic',
        updateToolboxOnHover:
          'Actualizar Coordenadas en el Cuadro de Herramientas Al Pasar el Ratón',
      },
      toasts: {
        infos: {
          copyCoordinates: {
            title: 'Copiado',
            message: 'Coordenadas copiadas al portapapeles',
          },
        },
        errors: {
          copyCoordinates: {
            title: 'Error',
            message: 'Error al copiar las coordenadas',
          },
        },
      },
    },
    debugInfoTool: {
      title: 'Información de Depuración',
    },
    directionTool: {
      title: 'Alternar Dirección',
    },
    drawTool: {
      title: 'Dibujar',
      toolbox: {
        titles: {
          draw: 'Dibujar',
        },
        groups: {
          shapes: {
            title: 'Forma',
            circle: 'Círculo',
            square: 'Cuadrado',
            rectangle: 'Rectángulo',
            lineString: 'Línea',
            point: 'Punto',
            polygon: 'Polígono',
          },
          intersectable: {
            title: 'Intersección',
            true: 'Sí',
            false: 'No',
          },
          strokeWidth: {
            title: 'Ancho del Trazo',
          },
          strokeColor: {
            title: 'Color del Trazo',
          },
          fillColor: {
            title: 'Color de Relleno',
          },
        },
      },
      layers: {
        defaultName: 'Capa de Dibujo',
      },
      toasts: {
        infos: {
          drawInHiddenLayer: {
            title: 'Consejo',
            message: 'Estás dibujando en una capa oculta',
          },
          missingIntersections: {
            title: 'Vaya',
            message: 'No se encontró ningún objeto intersectante',
          },
        },
      },
    },
    editTool: {
      title: 'Editar',
      toolbox: {
        titles: {
          edit: 'Editar',
        },
        groups: {
          misc: {
            title: 'Misceláneo',
            delete: 'Eliminar',
            rotate: 'Rotar',
            geometryData: 'Datos de Geometría',
          },
          shapes: {
            title: 'Formas',
            union: 'Unión',
            intersect: 'Intersección',
            exclude: 'Excluir',
            difference: 'Diferencia',
          },
          strokeColor: {
            title: 'Color del Trazo',
          },
          fillColor: {
            title: 'Color de Relleno',
          },
        },
      },
      settings: {
        mouseOnlyToEditVectorShapes:
          'Solo Ratón Para Editar Formas Vectoriales',
      },
      toasts: {
        infos: {
          missingFeatures: {
            title: 'Vaya',
            message: 'No hay objetos seleccionados',
          },
          strictOneFeature: {
            title: 'Vaya',
            message: 'Solo se puede seleccionar un objeto estrictamente',
          },
          strictTwoFeatures: {
            title: 'Vaya',
            message:
              'Se deben seleccionar estrictamente dos objetos superpuestos',
          },
        },
        errors: {
          operationFailed: {
            title: 'Error',
            message: 'Error al realizar la operación de forma',
          },
          invalidValue: {
            title: 'Error',
            message: 'Solo se permiten dígitos como entrada',
          },
        },
      },
      dialogs: {
        confirms: {
          deleteFeatures: {
            title: 'Eliminar Objetos',
            message: 'Eliminar el objeto seleccionado',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
          },
        },
        prompts: {
          rotateFeatures: {
            title: 'Rotar Objetos',
            message: 'Rotar Objetos por N grados',
            confirmText: 'Rotar Objetos',
            cancelText: 'Cancelar',
          },
        },
      },
    },
    exportPngTool: {
      title: 'Exportar PNG',
      toasts: {
        errors: {
          renderCanvas: {
            title: 'Error',
            message: 'Error al exportar el lienzo',
          },
        },
      },
    },
    fullscreenTool: {
      title: 'Alternar Pantalla Completa',
      toasts: {
        errors: {
          missingFullScreenSupport: {
            title: 'Error',
            message:
              'El modo de pantalla completa no es compatible con este navegador',
          },
        },
      },
    },
    graticuleTool: {
      title: 'Mostrar Graticula',
    },
    helpTool: {
      title: 'Ayuda',
      dialogs: {
        confirms: {
          openHelp: {
            title: 'Páginas de Ayuda',
            message:
              'Los navegadores bloquean la apertura automática de nuevas ventanas, aquí tienes un botón para que lo presiones',
            confirmText: 'Abrir Ayuda',
            cancelText: 'Cancelar',
          },
        },
      },
      toasts: {
        errors: {
          blockedByBrowser: {
            title: 'Error',
            message:
              'La acción fue restringida por la configuración del navegador',
          },
        },
      },
    },
    homeTool: {
      title: 'Inicio de Zoom',
      contextItems: {
        setHome: 'Establecer Inicio',
      },
      toasts: {
        infos: {
          setHomeLocation: {
            title: 'Nuevo Inicio',
            message: 'Se estableció una nueva ubicación como Inicio',
          },
        },
      },
    },
    importVectorLayerTool: {
      title: 'Importar Capa Vectorial',
      toasts: {
        errors: {
          unsupportedFormat: {
            title: 'Error',
            message: 'El formato de la capa no es compatible',
          },
          importFailed: {
            title: 'Error',
            message: 'Error al importar la capa vectorial',
          },
        },
      },
    },
    infoTool: {
      title: 'Información',
    },
    layerTool: {
      title: 'Capas',
      toolbox: {
        titles: {
          mapLayers: 'Capas de Mapa',
          featureLayers: 'Capas de Entidades',
        },
        groups: {
          createMapLayer: {
            create: 'Crear Capa de Mapa',
          },
          createFeatureLayer: {
            placeholder: 'Nombre',
            create: 'Crear Capa de Entidades',
          },
        },
      },
      contextItems: {
        addMapLayer: 'Agregar Capa de Mapa',
        addFeatureLayer: 'Agregar Capa de Entidades',
      },
      toasts: {
        infos: {
          addFeatureLayer: {
            title: 'Nueva Capa',
            message: 'Se creó una nueva capa de entidades',
          },
        },
        errors: {
          addFeatureLayer: {
            title: 'Error',
            message: 'Error al crear una nueva capa',
          },
          missingProjection: {
            title: 'Error',
            message: 'Definición de proyección faltante',
          },
          unsupportedFormat: {
            title: 'Error',
            message: 'El formato de la capa no es compatible',
          },
        },
      },
      dialogs: {
        prompts: {
          renameLayer: {
            title: 'Editar Nombre',
            message: 'Editar nombre para la capa',
            confirmText: 'Renombrar',
            cancelText: 'Cancelar',
          },
        },
        confirms: {
          deleteLayer: {
            title: 'Eliminar Capa',
            message: '¿Quieres eliminar la capa?',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
          },
        },
      },
    },
    magnifyTool: {
      title: 'Lupa',
      toasts: {
        errors: {
          renderCanvas: {
            title: 'Error',
            message: 'Error inesperado al usar la lupa',
          },
        },
      },
    },
    measureTool: {
      title: 'Medir',
      toolbox: {
        titles: {
          measure: 'Medir',
        },
        groups: {
          type: {
            title: 'Tipo',
            lineString: 'Longitud',
            polygon: 'Área',
          },
          strokeColor: {
            title: 'Color del Trazo',
          },
          fillColor: {
            title: 'Color de Relleno',
          },
        },
      },
      layers: {
        defaultName: 'Capa de Mediciones',
      },
      toasts: {
        infos: {
          drawInHiddenLayer: {
            title: 'Consejo',
            message: 'Estás midiendo en una capa oculta',
          },
        },
      },
    },
    myLocationTool: {
      title: 'Mi Ubicación',
      dialogs: {
        confirms: {
          exitFullscreen: {
            title: 'Salir de Pantalla Completa',
            message:
              'Para usar la geolocalización debes salir de pantalla completa',
            confirmText: 'Salir de Pantalla Completa',
            cancelText: 'Cancelar',
          },
        },
      },
      toasts: {
        infos: {
          fetchLocation: {
            title: 'Buscando',
            message: 'Intentando encontrar tu ubicación...',
          },
        },
        errors: {
          exitFullscreen: {
            title: 'Error',
            message: 'Error al salir de pantalla completa',
          },
          locationNotFound: {
            title: 'Error',
            message: 'No se pudo encontrar la ubicación',
          },
        },
      },
    },
    overviewTool: {
      title: 'Resumen del Mapa',
      toolbox: {
        titles: {
          overview: 'Resumen del Mapa',
        },
      },
    },
    refreshTool: {
      title: 'Actualizar Página',
    },
    resetNorthTool: {
      title: 'Restablecer Norte',
      contextItems: {
        rotate: 'Rotar Mapa',
      },
      dialogs: {
        prompts: {
          rotateMap: {
            title: 'Rotar Mapa',
            message: 'Establecer rotación del mapa en grados',
            confirmText: 'Rotar Mapa',
            cancelText: 'Cancelar',
          },
        },
      },
      toasts: {
        errors: {
          invalidValue: {
            title: 'Error',
            message: 'Solo se permiten dígitos como entrada',
          },
        },
      },
    },
    scaleLineTool: {
      title: 'Línea de Escala',
    },
    scissorsTool: {
      title: 'Tijeras de Polígono',
      toasts: {
        infos: {
          missingIntersections: {
            title: 'Vaya',
            message: 'No se encontró ningún objeto intersectante',
          },
        },
      },
    },
    settingsTool: {
      title: 'Configuración',
      contextItems: {
        clearBrowserState: 'Limpiar Estado del Navegador',
      },
      toasts: {
        infos: {
          clearBrowserState: {
            title: 'Limpiado',
            message:
              'Todos los elementos almacenados se restablecieron a su estado predeterminado',
          },
        },
        successes: {
          savedSettings: {
            title: 'Guardado',
            message:
              'Todas las configuraciones se guardaron en el almacenamiento del navegador',
          },
        },
      },
      dialogs: {
        confirms: {
          clearBrowserState: {
            title: 'Limpiar Estado del Navegador',
            message:
              '¿Quieres restablecer todos los elementos a su estado predeterminado para la Barra de Herramientas?',
            confirmText: 'Limpiar',
            cancelText: 'Cancelar',
          },
        },
      },
    },
    splitViewTool: {
      title: 'Vista Dividida',
      toolbox: {
        titles: {
          splitView: 'Vista Dividida',
        },
        groups: {
          leftSide: {
            title: 'Lado Izquierdo',
          },
          rightSide: {
            title: 'Lado Derecho',
          },
          swapSides: {
            swap: 'Intercambiar Lados',
          },
        },
        toasts: {
          infos: {
            strictOneLayer: {
              title: 'Consejo',
              message: 'Debes tener más de una capa',
            },
          },
          errors: {
            layerFailedToLoad: {
              title: 'Error',
              message: 'No se pudieron cargar las capas',
            },
          },
        },
      },
    },
    themeTool: {
      title: 'Alternar Tema',
    },
    toolboxTool: {
      title: 'Alternar Caja de Herramientas',
    },
    translationTool: {
      title: 'Traducir',
      dialogs: {
        selects: {
          changeLanguage: {
            title: 'Idioma',
            message: 'El idioma actual es',
            confirmText: 'Cambiar Idioma',
            cancelText: 'Cancelar',
          },
        },
      },
    },
    zoomboxTool: {
      title: 'Zoombox',
      tooltips: {
        dragToZoom: 'Arrastrar para hacer Zoom',
      },
    },
    zoomInTool: {
      title: 'Acercar',
    },
    zoomOutTool: {
      title: 'Alejar',
    },
    TreeDecisionTool: {
      title: 'Árbol de Decisiones',
    },
    MiraTool: {
      title: 'Mira+',
    },
  },
});

'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' :
                                            'id="xs-controllers-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' :
                                        'id="xs-injectables-links-module-AppModule-efe58e3a007ce3b1d704080329b8948664ff6ed91d5b000f616c57b6436a73aa243026202e94f41d255ab091fd244df784187d1f591af3211590d908e8722fd4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                            'id="xs-controllers-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' :
                                        'id="xs-injectables-links-module-AuthModule-6b4723e248ad15f06969e2cc5ac4b5d72d54490ed3f61ae03ce13fa73a52a614c28b1ddff2e6f14d7b4983e54aed229a33563ac4c4aca67ff05d3d39c395cba9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SessionModule-463563930512bf0d059ae9794b62aaa19dae000d094ff3c7231663e4dfa723d0b156346d2c2ec30e3a8e6711615ed8fbf9af3d4a3ea6706c7c8b49fafa4d6bf7"' : 'data-bs-target="#xs-injectables-links-module-SessionModule-463563930512bf0d059ae9794b62aaa19dae000d094ff3c7231663e4dfa723d0b156346d2c2ec30e3a8e6711615ed8fbf9af3d4a3ea6706c7c8b49fafa4d6bf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SessionModule-463563930512bf0d059ae9794b62aaa19dae000d094ff3c7231663e4dfa723d0b156346d2c2ec30e3a8e6711615ed8fbf9af3d4a3ea6706c7c8b49fafa4d6bf7"' :
                                        'id="xs-injectables-links-module-SessionModule-463563930512bf0d059ae9794b62aaa19dae000d094ff3c7231663e4dfa723d0b156346d2c2ec30e3a8e6711615ed8fbf9af3d4a3ea6706c7c8b49fafa4d6bf7"' }>
                                        <li class="link">
                                            <a href="injectables/SessionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionDto.html" data-type="entity-link" >CreateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisIoAdapter.html" data-type="entity-link" >RedisIoAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionGateway.html" data-type="entity-link" >SessionGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSessionDto.html" data-type="entity-link" >UpdateSessionDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/SessionGuard.html" data-type="entity-link" >SessionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
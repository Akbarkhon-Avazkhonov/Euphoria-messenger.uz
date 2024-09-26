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
                    <a href="index.html" data-type="index-link">@euphoria-messenger/backend documentation</a>
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
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' :
                                            'id="xs-controllers-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' :
                                        'id="xs-injectables-links-module-AdminModule-4351d13db54c8c76c5c4f694a443031e59ffdb970a716a02d1c061b5fd02218de7ebf17739c5e81d193d628a46f67ab1ab88a92e7a1d0b7c28c0c008cc00bf8b"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' : 'data-bs-target="#xs-controllers-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' :
                                            'id="xs-controllers-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' :
                                        'id="xs-injectables-links-module-AppModule-4ad382b30c8840c7e4c37d8d989e8fb7ec5cf2c69a3a1c5ef74899255f957c053bf2be627b55862ef5efff579cef3506c126b73e84a40a1e626e97283c06bc53"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' :
                                            'id="xs-controllers-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' :
                                        'id="xs-injectables-links-module-AuthModule-3ef2599da606c739b83ac6b4193ea4bbc66f4152f146b56c96306f174f336ed8132fde030f3fe76e3b82f148e46b0ed79d2b5adc23fc28d4fff7efcfc8afe7ed"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PgModule.html" data-type="entity-link" >PgModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PgModule-4015fb73f1b4a59419bd659c94ebef9a7d8ac9fcab51cd739f743b246208bfa8463a0550370a7cb94f877a679bf082b7e1b488aefe9f0880b7abd3f3f290265a"' : 'data-bs-target="#xs-injectables-links-module-PgModule-4015fb73f1b4a59419bd659c94ebef9a7d8ac9fcab51cd739f743b246208bfa8463a0550370a7cb94f877a679bf082b7e1b488aefe9f0880b7abd3f3f290265a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PgModule-4015fb73f1b4a59419bd659c94ebef9a7d8ac9fcab51cd739f743b246208bfa8463a0550370a7cb94f877a679bf082b7e1b488aefe9f0880b7abd3f3f290265a"' :
                                        'id="xs-injectables-links-module-PgModule-4015fb73f1b4a59419bd659c94ebef9a7d8ac9fcab51cd739f743b246208bfa8463a0550370a7cb94f877a679bf082b7e1b488aefe9f0880b7abd3f3f290265a"' }>
                                        <li class="link">
                                            <a href="injectables/PgService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PgService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-6bcb90a339b2a35a321093c8ee417ce715101be0b88e371b87c06efb6354766e2042f5b2b0a22a23389d4dd2257feb261568889f4ae7e69524a484e01f43d9fd"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-6bcb90a339b2a35a321093c8ee417ce715101be0b88e371b87c06efb6354766e2042f5b2b0a22a23389d4dd2257feb261568889f4ae7e69524a484e01f43d9fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-6bcb90a339b2a35a321093c8ee417ce715101be0b88e371b87c06efb6354766e2042f5b2b0a22a23389d4dd2257feb261568889f4ae7e69524a484e01f43d9fd"' :
                                        'id="xs-injectables-links-module-RedisModule-6bcb90a339b2a35a321093c8ee417ce715101be0b88e371b87c06efb6354766e2042f5b2b0a22a23389d4dd2257feb261568889f4ae7e69524a484e01f43d9fd"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' :
                                            'id="xs-controllers-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' :
                                        'id="xs-injectables-links-module-RolesModule-a3310a7af75b07493e5cc432f94d8b45dcbb2a6d0a222f9dac141c4c56ab06e2e72d9d91bfba6876055894f2a5ea9c4b3de21525a53947eb441a86b8d1aacf74"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
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
                            <li class="link">
                                <a href="modules/TablesModule.html" data-type="entity-link" >TablesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TablesModule-85256259bfd22e653df6fad789f9a35a4ce205db59ba5d4e7934ed1969458a4ec9fbe95b5a2f7619d89eb7d8ad6824a8bd0d79d2082b53c8cd627fce2d901f73"' : 'data-bs-target="#xs-injectables-links-module-TablesModule-85256259bfd22e653df6fad789f9a35a4ce205db59ba5d4e7934ed1969458a4ec9fbe95b5a2f7619d89eb7d8ad6824a8bd0d79d2082b53c8cd627fce2d901f73"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TablesModule-85256259bfd22e653df6fad789f9a35a4ce205db59ba5d4e7934ed1969458a4ec9fbe95b5a2f7619d89eb7d8ad6824a8bd0d79d2082b53c8cd627fce2d901f73"' :
                                        'id="xs-injectables-links-module-TablesModule-85256259bfd22e653df6fad789f9a35a4ce205db59ba5d4e7934ed1969458a4ec9fbe95b5a2f7619d89eb7d8ad6824a8bd0d79d2082b53c8cd627fce2d901f73"' }>
                                        <li class="link">
                                            <a href="injectables/TablesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TgAuthModule.html" data-type="entity-link" >TgAuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' : 'data-bs-target="#xs-controllers-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' :
                                            'id="xs-controllers-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' }>
                                            <li class="link">
                                                <a href="controllers/TgAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TgAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' : 'data-bs-target="#xs-injectables-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' :
                                        'id="xs-injectables-links-module-TgAuthModule-50344a1ee915c67057e78ebb3cd244fd9ebe7874c8d3aa9af2a1037ba85c79cbdf01b14a10274a0031773ba075c758dfad9a0d8148924a413e8e1af0a342ecb0"' }>
                                        <li class="link">
                                            <a href="injectables/TgAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TgAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' :
                                            'id="xs-controllers-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' :
                                        'id="xs-injectables-links-module-UsersModule-5334e4a6e60ccfbcdebe31668af5cf4a1ecf3ea332ceaa58dfa219e30687c9d2d1bedb71d55445acd7d254c83c6eb2e8d87a5bf98c45cab2c23a7f0af41ccb44"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
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
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TgAuthController.html" data-type="entity-link" >TgAuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
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
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionDto.html" data-type="entity-link" >CreateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginAuthDto.html" data-type="entity-link" >LoginAuthDto</a>
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
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSessionDto.html" data-type="entity-link" >UpdateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordDto.html" data-type="entity-link" >UpdateUserPasswordDto</a>
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
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PgService.html" data-type="entity-link" >PgService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisService.html" data-type="entity-link" >RedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TablesService.html" data-type="entity-link" >TablesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TgAuthService.html" data-type="entity-link" >TgAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
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
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
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
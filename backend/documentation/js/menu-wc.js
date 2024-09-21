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
                                            'data-bs-target="#controllers-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' :
                                            'id="xs-controllers-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' :
                                        'id="xs-injectables-links-module-AdminModule-e717f6f6f493c7faf506da9a75394cbf69826d5e66c9dd0ccc937b5d9f72cb5236f1f6fb585d2573368f18451b9838c8a0938a4941da32b4556f78824162d261"' }>
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
                                            'data-bs-target="#controllers-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' :
                                            'id="xs-controllers-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' :
                                        'id="xs-injectables-links-module-AppModule-e875a34a296dd95a29767c8dde8dde12df92d0ff565bc5a4a93e5947724261938b80b681a030e8feb2135b81e7be35d5ae27244d5dbe312234f509c7cc981ddb"' }>
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
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                            'id="xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                        'id="xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
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
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionDto.html" data-type="entity-link" >CreateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
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
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSessionDto.html" data-type="entity-link" >UpdateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
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
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
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
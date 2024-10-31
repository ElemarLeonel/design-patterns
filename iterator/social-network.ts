// Interface para os perfis
class Profile {
    private id: string;
    private email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }
}

// Interface para o Iterator
interface ProfileIterator {
    getNext(): Profile | null;
    hasMore(): boolean;
}

// Interface para a Rede Social
interface SocialNetwork {
    createFriendsIterator(profileId: string): ProfileIterator;
    createCoworkersIterator(profileId: string): ProfileIterator;
}

// Implementação do Iterator para o Facebook
class FacebookIterator implements ProfileIterator {
    private facebook: Facebook;
    private profileId: string;
    private type: string;
    private currentPosition: number = 0;
    private cache: Profile[] = [];

    constructor(facebook: Facebook, profileId: string, type: string) {
        this.facebook = facebook;
        this.profileId = profileId;
        this.type = type;
        this.lazyInit();
    }

    private lazyInit(): void {
        if (this.cache.length === 0) {
            if (this.type === "friends") {
                this.cache = this.facebook.getFriends(this.profileId);
            } else if (this.type === "coworkers") {
                this.cache = this.facebook.getCoworkers(this.profileId);
            }
        }
    }

    public getNext(): Profile | null {
        if (!this.hasMore()) {
            return null;
        }
        const profile = this.cache[this.currentPosition];
        this.currentPosition++;
        return profile;
    }

    public hasMore(): boolean {
        return this.currentPosition < this.cache.length;
    }
}

// Implementação da Rede Social Facebook
class Facebook implements SocialNetwork {
    private profiles: Profile[] = [];

    constructor(profiles: Profile[]) {
        this.profiles = profiles;
    }

    public createFriendsIterator(profileId: string): ProfileIterator {
        return new FacebookIterator(this, profileId, "friends");
    }

    public createCoworkersIterator(profileId: string): ProfileIterator {
        return new FacebookIterator(this, profileId, "coworkers");
    }

    public getFriends(profileId: string): Profile[] {
        // Aqui você faria uma consulta para retornar amigos (simulado)
        return this.profiles.filter((profile) => profile.getId() !== profileId);
    }

    public getCoworkers(profileId: string): Profile[] {
        // Aqui você faria uma consulta para retornar colegas de trabalho (simulado)
        return this.profiles.filter((profile) => profile.getId() !== profileId);
    }
}

// Classe que envia mensagens usando o iterador
class SocialSpammer {
    public send(iterator: ProfileIterator, message: string): void {
        while (iterator.hasMore()) {
            const profile = iterator.getNext();
            if (profile) {
                console.log(`Enviando mensagem para ${profile.getEmail()}: ${message}`);
            }
        }
    }
}

// Classe principal da aplicação
class Application {
    private spammer: SocialSpammer;
    private network: SocialNetwork;

    constructor(network: SocialNetwork) {
        this.network = network;
        this.spammer = new SocialSpammer();
    }

    public sendSpamToFriends(profileId: string, message: string): void {
        const iterator = this.network.createFriendsIterator(profileId);
        this.spammer.send(iterator, message);
    }

    public sendSpamToCoworkers(profileId: string, message: string): void {
        const iterator = this.network.createCoworkersIterator(profileId);
        this.spammer.send(iterator, message);
    }
}

// Exemplo de uso
const profiles = [
    new Profile("1", "friend1@example.com"),
    new Profile("2", "coworker1@example.com"),
    new Profile("3", "friend2@example.com"),
    new Profile("4", "coworker2@example.com"),
];

const facebook = new Facebook(profiles);
const app = new Application(facebook);

app.sendSpamToFriends("1", "Olá, amigo!");
app.sendSpamToCoworkers("2", "Olá, colega de trabalho!");

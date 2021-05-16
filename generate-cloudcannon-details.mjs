import { writeFile, readdir } from 'fs/promises';

export async function generateCloudCannonDetails(userInput) {
    const collections = await getCollections(userInput.collections);
    const details = {
        time: new Date().toISOString(),
        cloudcannon: {
            //TODO: Get name and version from package.json file
            name: "ssg-reader",
            version: "0.0.1"
        },
        generator: userInput.generator ?? {},
        collections: collections,
        pages: [],
        static: []
    };

    await writeFile('./_cloudcannon/details.json', JSON.stringify(details, null, 2));
}

async function getCollections(collectionsConfig = {}) {

    const keys = Object.keys(collectionsConfig);
    // "drafts": [{"path": "_drafts/incomplete.md","url": "/business/2016/08/10/incomplete.html","collection": "posts","id": "/business/2016/08/10/incomplete","draft": true,"categories": ["Business"],"title": "WIP","date": "2016-08-10 00:00:00 +0000","tags": ["hello"],"author_staff_member": "jane-doe","image": null,"large_header": false,"slug": "incomplete","ext": ".md"},{"path": "other/_drafts/testing-for-category.md","url": "/other/business/2021/02/22/testing-for-category.html","collection": "posts","id": "/other/business/2021/02/22/testing-for-category","draft": true,"categories": ["other","Business"],"title": "Testing for category drafts","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"slug": "testing-for-category","ext": ".md","date": "2021-02-22 02:04:29 +0000"}],"posts": [{"path": "_posts/2016-08-10-business-mergers.md","url": "/business/2016/08/10/business-mergers.html","collection": "posts","id": "/business/2016/08/10/business-mergers","draft": false,"categories": ["Business"],"title": "Business Mergers","date": "2016-08-10 00:00:00 +0000","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"slug": "business-mergers","ext": ".md"},{"path": "_posts/2016-11-11-real-estate-flipping.md","url": "/property/2016/11/11/real-estate-flipping.html","collection": "posts","id": "/property/2016/11/11/real-estate-flipping","draft": false,"categories": ["Property"],"title": "Real Estate Flipping","date": "2016-11-11 00:00:00 +0000","tags": ["hi"],"author_staff_member": "john-doe","image": "https://unsplash.it/600/450?image=448&a=.png","large_header": false,"slug": "real-estate-flipping","ext": ".md"},{"path": "other/_posts/2020-08-10-category-test.md","url": "/other/business/2020/08/10/category-test.html","collection": "posts","id": "/other/business/2020/08/10/category-test","draft": false,"categories": ["other","Business"],"title": "Category test","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"date": "2020-08-10 00:00:00 +0000","slug": "category-test","ext": ".md"}]},

    const result = {};
    console.log(path.join('/', 'hello'))
    for (const key of keys) {
    //     const files = await readdir(path.join('.', collectionsConfig[key].path));
    //     console.log(collectionsConfig[key].path)
    //     result[key] = files.map((file) => {
    //         return {
    //             path: path.join('.', collectionsConfig[key].path, file),
    //             collection: key
    //         };
    //     });
    }
    // console.log(result)
    return result;
}

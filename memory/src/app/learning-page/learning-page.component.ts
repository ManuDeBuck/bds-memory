import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface Piece {
  "title": string;
  "image": string;
  "location": string;
  "creator": string;
  "creatorLocation": string;
  "description": string;
  "material": string;
  "technique": string;
  "category": string;
}

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.css']
})
export class LearningPageComponent implements OnInit {
  public pieces: Piece[] = [];

  constructor(public router: Router) {
    this.getPieces(10).then(el => {
      this.pieces = el.slice(0, 6);
    });
  }

  ngOnInit(): void {
  }

  async getEntities(count: number) {
    let response = await fetch("https://gent.robindebaetsdev.workers.dev/", {
      "method": "POST",
      "body": JSON.stringify({
        "operationName": "getEntities",
        "variables": {
          "limit": count,
          "skip": 0,
          "searchValue": {
            "value": "",
            "isAsc": false,
            "relation_filter": [],
            "randomize": true,
            "seed": Math.random().toString(),
            "key": "title",
            "has_mediafile": true,
            "skip_relations": false
          }
        },
        "query": `

    query getEntities($limit: Int, $skip: Int, $searchValue: SearchFilter!) {
    Entities(limit: $limit, skip: $skip, searchValue: $searchValue) {
        count
        limit
        results {
        ...fullEntity
        __typename
        }
        relations {
        ...fullRelation
        __typename
        }
        __typename
    }
    }

    fragment fullRelation on Relation {
    key
    type
    label
    value
    order
    __typename
    }

    fragment fullEntity on Entity {
    id
    type
    title: metadata(key: [title]) {
        key
        value
        __typename
    }
    scopeNote: metadata(key: [scopeNote]) {
        key
        value
        __typename
    }
    description: metadata(key: [description]) {
        key
        value
        __typename
    }
    objectNumber: metadata(key: [object_number]) {
        key
        value
        __typename
    }
    metadataCollection(
        key: [title, description, object_number, scopeNote]
        label: []
    ) {
        ...MetadataCollectionFields
        __typename
    }
    primary_mediafile
    primary_transcode
    mediafiles {
        _id
        original_file_location
        transcode_filename
        filename
        metadata {
        key
        value
        __typename
        }
        __typename
    }
    relations {
        key
        type
        label
        value
        __typename
    }
    __typename
    }

    fragment MetadataCollectionFields on MetadataCollection {
    label
    nested
    data {
        value
        unMappedKey
        label
        nestedMetaData {
        ...NestedEntity
        metadataCollection(
            key: [title, description, object_number, scopeNote]
            label: [\"objectnummer\"]
        ) {
            label
            nested
            data {
            value
            unMappedKey
            label
            nestedMetaData {
                ...nestedEndEntity
                __typename
            }
            __typename
            }
            __typename
        }
        __typename
        }
        __typename
    }
    __typename
    }

    fragment NestedEntity on Entity {
    id
    type
    title: metadata(key: [title]) {
        key
        value
        __typename
    }
    description: metadata(key: [description]) {
        key
        value
        __typename
    }
    objectNumber: metadata(key: [object_number]) {
        key
        value
        __typename
    }
    mediafiles {
        _id
        original_file_location
        transcode_filename
        filename
        __typename
    }
    relations {
        key
        type
        label
        value
        __typename
    }
    __typename
    }

    fragment nestedEndEntity on Entity {
    id
    type
    title: metadata(key: [title]) {
        key
        value
        __typename
    }
    description: metadata(key: [description]) {
        key
        value
        __typename
    }
    objectNumber: metadata(key: [object_number]) {
        key
        value
        __typename
    }
    metadataCollection(
        key: [title, description, object_number, scopeNote]
        label: [\"objectnummer\"]
    ) {
        label
        nested
        data {
        value
        unMappedKey
        label
        __typename
        }
        __typename
    }
    mediafiles {
        _id
        original_file_location
        transcode_filename
        filename
        __typename
    }
    relations {
        key
        type
        label
        value
        __typename
    }
    __typename
    }`
      }),
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    return (await response.json())["data"]["Entities"]["results"];
  }

  async getPieces(count: number) {
    let entities = await this.getEntities(count);
    let results = [];
    for(let entity of entities) {
      let location = "";
      let creator = "";
      let creatorLocation = "";
      let material = "";
      let category = "";
      let technique = "";
      let relations = entity["relations"];
      for(let relation of relations) {
        let label = relation["label"];
        let value = relation["value"];
        if(label == "MaterieelDing.beheerder") {
          location = value;
        }
        if(label == "vervaardiger") {
          creator = value;
        }
        if(label == "vervaardiging.plaats") {
          creatorLocation = value;
        }
        if(label == "materiaal") {
          material = value;
        }
        if(label == "techniek") {
          technique = value;
        }
        if(label == "object_category") {
          category = value;
        }
      }
      results.push({
        "title": entity["title"][0]["value"],
        "image": `https://api.collectie.gent/iiif/imageiiif/3/${entity["primary_transcode"]}/full/%5E1000,/0/default.jpg`,
        "location": location,
        "creator": creator,
        "creatorLocation": creatorLocation,
        "description": entity["description"][0]["value"],
        "material": material,
        "technique": technique,
        "category": category
      });
    }
    return results;
  }

}
